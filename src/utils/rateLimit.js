// Simple in-memory rate limiter
// Limits requests per IP + User Agent combination

const requestLog = new Map();

const RATE_LIMIT = 5; // max requests
const WINDOW_MS = 60 * 1000; // per 1 minute

export function checkRateLimit(ip, userAgent) {
  const key = `${ip}:${userAgent}`;
  const now = Date.now();

  // Get or initialize request history for this key
  if (!requestLog.has(key)) {
    requestLog.set(key, []);
  }

  const requests = requestLog.get(key);

  // Remove requests outside the time window
  const recentRequests = requests.filter(timestamp => now - timestamp < WINDOW_MS);

  // Check if limit exceeded
  if (recentRequests.length >= RATE_LIMIT) {
    return {
      allowed: false,
      resetAt: new Date(recentRequests[0] + WINDOW_MS).toISOString(),
    };
  }

  // Add current request and update the log
  recentRequests.push(now);
  requestLog.set(key, recentRequests);

  // Cleanup old entries periodically (keep map from growing indefinitely)
  if (Math.random() < 0.01) { // 1% chance on each request
    for (const [k, timestamps] of requestLog.entries()) {
      const stillValid = timestamps.filter(t => now - t < WINDOW_MS);
      if (stillValid.length === 0) {
        requestLog.delete(k);
      } else {
        requestLog.set(k, stillValid);
      }
    }
  }

  return { allowed: true };
}