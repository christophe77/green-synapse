import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du composant web
app.use(express.static(path.join(__dirname, '../../web-components')));

// Route pour l'API
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    // TODO: Implémenter la logique de l'API
    res.json({ response: `Received: ${message}` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 