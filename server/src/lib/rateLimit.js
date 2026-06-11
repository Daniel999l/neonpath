const counts = {};

function getWindowKey() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hour = String(now.getUTCHours()).padStart(2, '0');
  return `${year}-${month}-${day}T${hour}:00Z`;
}

export function checkAndIncrement(ip, limit) {
  const windowKey = getWindowKey();
  const key = `ip:${ip}:${windowKey}`;

  const now = Date.now();
  for (const k of Object.keys(counts)) {
    if (now - counts[k].timestamp > 60 * 60 * 1000) delete counts[k];
  }

  const entry = counts[key];
  let current = entry ? entry.count : 0;

  if (current >= limit) {
    return { allowed: false, remaining: 0, resetAt: windowKey };
  }

  current++;
  counts[key] = { count: current, timestamp: now };

  return { allowed: true, remaining: limit - current, resetAt: windowKey };
}

export function rateLimitMiddleware(limit = 10) {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress || 'unknown';
    const result = checkAndIncrement(ip, limit);

    if (!result.allowed) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        retryAfter: '1 hour',
        limit,
      });
    }

    res.set('X-RateLimit-Limit', limit);
    res.set('X-RateLimit-Remaining', result.remaining);
    next();
  };
}