// A speed bump for the first look: so many looks per visitor, and so many per minute from this
// instance altogether, so the site is never a convenient way to scan other people's sites.
const PER_IP = 12;
const IP_WINDOW_MS = 10 * 60 * 1000;
const PER_MINUTE = 40;

const byIp = new Map<string, { count: number; since: number }>();
let minute = { count: 0, since: 0 };

export function allowLook(ip: string, now = Date.now()): boolean {
  if (now - minute.since > 60_000) minute = { count: 0, since: now };
  minute.count += 1;
  if (minute.count > PER_MINUTE) return false;

  byIp.forEach((entry, key) => {
    if (now - entry.since > IP_WINDOW_MS) byIp.delete(key);
  });
  const entry = byIp.get(ip);
  if (!entry || now - entry.since > IP_WINDOW_MS) {
    byIp.set(ip, { count: 1, since: now });
    return true;
  }
  entry.count += 1;
  return entry.count <= PER_IP;
}

export function clientIp(headers: Headers): string {
  return headers.get('x-real-ip') || headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
