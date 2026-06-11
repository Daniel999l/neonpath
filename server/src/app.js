import express from 'express';
import cors from 'cors';
import generateRoutes from './routes/generate.js';

const app = express();

app.use(cors());
app.use(express.json());

// API routes only – no static files, no listen
app.use('/api/generate', generateRoutes);
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Debug route — delete after confirming
app.get('/api/debug', (req, res) => {
  res.json({
    hasGroqKey: !!process.env.GROQ_API_KEY,
    groqKeyPrefix: process.env.GROQ_API_KEY?.slice(0, 4),
    nodeEnv: process.env.NODE_ENV,
  });
});

export default app;