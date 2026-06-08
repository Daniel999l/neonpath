import { Router } from 'express';
import { generateRoadmap } from '../services/groq.js';
import { rateLimitMiddleware } from '../lib/rateLimit.js';

const router = Router();

// Apply rate limit: max 10 requests per hour per IP
router.post('/', rateLimitMiddleware(10), async (req, res) => {
  try {
    const { name, interests, goals, level } = req.body;

    if (!name || !interests || !goals || !level) {
      return res.status(400).json({ error: 'All fields required: name, interests, goals, level' });
    }

    const roadmap = await generateRoadmap({ name, interests, goals, level });
    res.json({ roadmap });
  } catch (err) {
    console.error('Generate error:', err);
    res.status(500).json({ error: 'Failed to generate roadmap. Please try again.' });
  }
});

export default router;