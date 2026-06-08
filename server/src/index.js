import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import generateRoutes from './routes/generate.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/generate', generateRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`NeonPath backend running on port ${PORT}`);
});