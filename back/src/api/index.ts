import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import gptRoutes from './routes/gptRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', gptRoutes);

const port = 5000;

app.listen(port, () => {
	console.log(`API GPT-4All écoute sur http://localhost:${port}`);
});
export default app;
