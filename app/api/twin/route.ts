import { MODEL, systemPrompt } from "@/lib/twin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
const MAX_CHARS = 1000;
const MAX_TURNS = 20;

// Best-effort, per-instance. Bounds casual hammering; the real backstop is the
// spend limit on the OpenRouter key.
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();

  const seen = hits.get(ip);
  if (!seen || now > seen.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  seen.count += 1;
  return seen.count > MAX_PER_WINDOW;
}

type Message = { role: "user" | "assistant"; content: string };

function parseMessages(input: unknown): Message[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_TURNS) return null;

  const out: Message[] = [];
  for (const m of input) {
    const role = (m as Message)?.role;
    const content = (m as Message)?.content;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || content.length === 0 || content.length > MAX_CHARS) return null;
    out.push({ role, content });
  }
  return out;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "The twin is not configured." }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many messages. Give it a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const messages = parseMessages((body as { messages?: unknown })?.messages);
  if (!messages) {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Title": "Sonu Yadav digital twin",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
      temperature: 0.3,
      max_tokens: 700,
    }),
  });

  // Deliberately generic: the upstream body can carry account detail, and it must
  // not reach the browser or the logs.
  if (!upstream.ok || !upstream.body) {
    console.error(`twin: openrouter responded ${upstream.status}`);
    return Response.json({ error: "The twin is unavailable right now." }, { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
