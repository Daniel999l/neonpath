import { Router } from 'express';
import { generateRoadmap } from '../services/groq.js';

const router = Router();

router.post('/', async (req, res) => {
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