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
app.use("/", express.static(path.join(rootDir, 'packages/website')));

// Route par défaut pour servir la page d'accueil
app.get('/', (req, res) => {
  const homePagePath = path.join(rootDir, '/packages/website/index.html');
  console.log('Serving home page from:', homePagePath);
  res.sendFile(homePagePath);
});

// Serve the assets folder specifically
// Serve assets folder correctly, regardless of how it's accessed
app.use("/vite-growing/assets", express.static(path.join(rootDir, 'packages/vite-growing/dist/assets')));
app.use("/assets", express.static(path.join(rootDir, 'packages/vite-growing/dist/assets')));
app.use("/vite-growing", express.static(path.join(rootDir, 'packages/vite-growing/dist')));

app.get('/vite-growing', (req, res) => {
  const homePagePath = path.join(rootDir, '/packages/vite-growing/dist/index.html');
  console.log('Serving home page from:', homePagePath);
  res.sendFile(homePagePath);
});

app.listen(port, () => {
	console.log(`Server smoking on pot ${port}`);
  console.log('Serving static files from:', path.join(rootDir, 'packages/website'));
  console.log('Web components directory:', path.join(rootDir, 'packages/web-components/dist'));
  console.log('Web components URL:', `http://localhost:${port}/web-components/index.js`);
});