import express from 'express';
import type { Request, Response } from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 9000;

// Serve static files from the pages directory
app.use(express.static(join(__dirname, '../pages')));

// Serve the Syn web component
app.use('/syn', express.static(join(__dirname, '../../node_modules/@green-synapse/web-components/dist')));

// Serve index.html for all routes (SPA support)
app.get('*', (_req: Request, res: Response) => {
	res.sendFile(join(__dirname, '../pages/home/index.html'));
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
