/**
 * A small in-memory throttle for the public endpoints.
 *
 * Not a replacement for a real WAF, but it stops the obvious abuse: someone
 * hammering the enquiry form, or spamming a known student's inbox with
 * sign-in emails. Resets when the server restarts, which is fine for this.
 */

type Hit = { count: number; resetAt: number };
const hits = new Map<string, Hit>();

// Stop the map growing forever on a long-running server.
function sweep(now: number) {
  if (hits.size < 500) return;
  for (const [key, hit] of hits) if (hit.resetAt < now) hits.delete(key);
}

export function rateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  sweep(now);

  const existing = hits.get(key);
  if (!existing || existing.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  if (existing.count > max) {
    return {
      ok: false,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }
  return { ok: true, retryAfterSeconds: 0 };
}

/** Best-effort caller identity. Behind a proxy, x-forwarded-for is the real one. */
export function callerKey(request: Request, prefix: string): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0].trim() || "unknown";
  return `${prefix}:${ip}`;
}
