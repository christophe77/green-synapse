import express from 'express';
import type { Request, Response } from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 8080;

// Serve the Syn web component first
app.use('/syn', express.static(join(__dirname, '../../../packages/web-components/dist')));

// Then serve static files from the web directory
app.use(express.static(join(__dirname, '..')));

app.get('/cross-breed-report', (_req: Request, res: Response) => {
	res.sendFile(join(__dirname, '../pages/cross-breed-report/index.html'));
});
// Finally, serve index.html for all other routes (SPA support)
app.get('*', (_req: Request, res: Response) => {
	res.sendFile(join(__dirname, '../pages/home/index.html'));
});

app.listen(port, '0.0.0.0', () => {
	console.log(`Server smoking on pot ${port}`);
});
