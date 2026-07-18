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
export async function allowRequest(ip: string): Promise<boolean> {
  try {
    const store = getStore("twin-rate-limit");
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
  } catch {
    return true;
  }
}
