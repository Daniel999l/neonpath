import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';

const PORT = process.env.PORT || 3001;

// In dev, serve the built client and handle SPA fallback (only used locally)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '../../client/dist');

app.use(express.static(clientDistPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`NeonPath server running on port ${PORT}`);
});