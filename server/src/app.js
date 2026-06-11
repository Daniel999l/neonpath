import express from 'express';
import cors from 'cors';
import generateRoutes from './routes/generate.js';

const app = express();

app.use(cors());
app.use(express.json());

// API routes only – no static files, no listen
app.use('/api/generate', generateRoutes);
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

export default app;