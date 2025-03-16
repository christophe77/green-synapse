import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);

const port = process.env.API_PORT ?? 3000;
app.listen(port, () => {
  console.log(`Green Synapse API running on port ${port}`);
});