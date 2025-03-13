import express from 'express';
import { askQuestion } from '../controllers/gptController';

const router = express.Router();

router.post('/ask', askQuestion);

export default router;
