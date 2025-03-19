import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../..');

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

// Configuration des types MIME pour les modules JavaScript
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.type('application/javascript; charset=utf-8');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  next();
});

// Servir les fichiers de node_modules avec le bon type MIME
app.use('/node_modules', express.static(path.join(rootDir, 'node_modules'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
  }
}));

// Servir les fichiers statiques du composant web
app.use('/web-components', express.static(path.join(rootDir, 'packages/web-components/dist'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
  }
}));

// Servir les fichiers de la page web
app.use(express.static(path.join(rootDir, 'web')));

// Route par défaut pour servir la page d'accueil
app.get('/', (req, res) => {
  const homePagePath = path.join(rootDir, 'web/pages/home/index.html');
  console.log('Serving home page from:', homePagePath);
  res.sendFile(homePagePath);
});

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
  console.log('Web components directory:', path.join(rootDir, 'packages/web-components/dist'));
  console.log('Web components URL:', `http://localhost:${port}/web-components/index.js`);
}); 