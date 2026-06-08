import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const FILE_PATH = path.join(DATA_DIR, 'rateLimits.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadCounts() {
  try {
    ensureDataDir();
    if (fs.existsSync(FILE_PATH)) {
      const raw = fs.readFileSync(FILE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // corrupt file, reset
  }
  return {};
}

function saveCounts(counts) {
  ensureDataDir();
  fs.writeFileSync(FILE_PATH, JSON.stringify(counts, null, 2));
}

function getWindowKey() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hour = String(now.getUTCHours()).padStart(2, '0');
  return `${year}-${month}-${day}T${hour}:00Z`; // ISO hour precision
}

export function checkAndIncrement(ip, limit) {
  const windowKey = getWindowKey();
  const key = `ip:${ip}:${windowKey}`;

  const counts = loadCounts();

  // Cleanup old entries (keep only last 48 hours)
  const now = Date.now();
  for (const k of Object.keys(counts)) {
    if (now - counts[k].timestamp > 48 * 60 * 60 * 1000) {
      delete counts[k];
    }
  }

  const entry = counts[key];
  let current = entry ? entry.count : 0;

  if (current >= limit) {
    return { allowed: false, remaining: 0, resetAt: windowKey };
  }

  current++;
  counts[key] = { count: current, timestamp: now };
  saveCounts(counts);

  return { allowed: true, remaining: limit - current, resetAt: windowKey };
}

/**
 * Express middleware for IP rate limiting.
 * @param {number} limit - max requests per hour per IP
 */
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

    // Optionally set headers
    res.set('X-RateLimit-Limit', limit);
    res.set('X-RateLimit-Remaining', result.remaining);
    next();
  };
}