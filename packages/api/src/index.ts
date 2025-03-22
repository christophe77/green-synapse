import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import apiRouter from './routes/apiRouter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack); 
  res.status(500).json({ error: 'An error occurred', details: err.message });
});

app.use('/api', apiRouter);
const port = process.env.API_PORT ?? 3000;
app.listen(port, () => {
  console.log(`Green Synapse API running on port ${port}`);
});