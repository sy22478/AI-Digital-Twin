import { getStore } from "@netlify/blobs";

// Per-IP request quota for the twin, backed by Netlify Blobs so the count holds
// across the ephemeral serverless instances the route runs on. A plain in-memory
// counter cannot: each instance has its own memory and is recycled between requests.
//
// Sliding window: we keep the timestamps of recent allowed requests for an IP and
// count how many fall in the last hour and the last day. The stored array is
// naturally bounded to MAX_PER_DAY entries, since we stop appending once the day
// limit is reached and entries older than a day are pruned on read.

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const MAX_PER_HOUR = 15;
const MAX_PER_DAY = 40;

// Blob keys must use a safe charset; IPv6 addresses contain colons.
function keyFor(ip: string): string {
  return ip.replace(/[^a-zA-Z0-9]/g, "_");
}

// Records the request if it is within the per-IP limits and returns whether it is
// allowed. Fails open: if Blobs is unreachable the request is allowed, since the
// OpenRouter spend cap is the real backstop and a storage blip must not take the
// twin down.
const STORE_NAME = "twin-rate-limit";

export async function allowRequest(ip: string): Promise<boolean> {
  try {
    // Strong consistency is required: a rate limiter reads a count, increments it,
    // and writes it back. Under the default eventual consistency, reads are served
    // from cache and lag writes, so sequential requests each read a stale array and
    // append to it, clobbering entries written in between. The count never climbs to
    // the limit and nothing is ever refused. Strong consistency makes every read
    // reflect the latest write.
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    const key = keyFor(ip);
    const now = Date.now();

    const previous = (await store.get(key, { type: "json" })) as number[] | null;
    const recent = (previous ?? []).filter((t) => now - t < DAY_MS);

    const inLastHour = recent.filter((t) => now - t < HOUR_MS).length;
    if (inLastHour >= MAX_PER_HOUR || recent.length >= MAX_PER_DAY) {
      return false;
    }

    recent.push(now);
    await store.setJSON(key, recent);
    return true;
  } catch (err) {
    // Failing open is deliberate: a Blobs outage must not take the twin down,
    // and the OpenRouter spend cap is the real backstop. But log it, because a
    // limiter that fails open silently is indistinguishable from one that does
    // not work at all: that is how two broken versions of this shipped.
    const e = err as Error;
    console.error(
      `[rate-limit] Blobs threw, failing open. store=${STORE_NAME} name=${e?.name} message=${e?.message}`,
    );
    return true;
  }
}
