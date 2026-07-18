import { MODEL } from "@/lib/twin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Exercises the real path a visitor hits: a genuine OpenRouter chat completion with
// the same MODEL and call shape as /api/twin, so a daily GET tells us the twin works
// end to end rather than checking a proxy for it (a balance lookup, a stubbed call).
// Deliberately cheap: a two-token prompt, one token out, and no system prompt.
export async function GET() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json({ ok: false, reason: "OPENROUTER_API_KEY is not set" }, { status: 503 });
  }

  // No rate limit here, deliberately. A monitor must never return a false failure:
  // a rate-limited check would report ok:false while the twin is actually fine, the
  // cry-wolf result that trains a person to ignore the monitor. The abuse it would
  // guard against is negligible, since max_tokens is 1 and each call costs a rounding
  // error; the twin route keeps its own per-IP limit.
  let upstream: Response;
  try {
    upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Title": "Sonu Yadav digital twin health check",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: "ping" }],
        max_tokens: 1,
      }),
    });
  } catch (err) {
    const e = err as Error;
    return Response.json({ ok: false, reason: `request failed: ${e?.message}` }, { status: 503 });
  }

  if (!upstream.ok) {
    // Name the actual failure (the upstream status) without leaking the key or any
    // account detail the upstream body might carry.
    return Response.json(
      { ok: false, reason: `openrouter responded ${upstream.status}` },
      { status: 503 },
    );
  }

  // A 200 with no usable completion is still a failure: the model returned nothing,
  // so the twin would too.
  const data = (await upstream.json().catch(() => null)) as
    | { choices?: { message?: { content?: unknown } }[] }
    | null;
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    return Response.json(
      { ok: false, reason: "openrouter returned no completion" },
      { status: 503 },
    );
  }

  return Response.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
