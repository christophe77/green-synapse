import express from 'express';
import queryAI from '../queryAI';

const router = express.Router();

router.post('/ask', async (req, res) => {
	const { question } = req.body;
	const { ask } = await queryAI();
	try {
		const response = await ask(question);
		res.json({ response });
	} catch (error) {
		res.status(500).json({ error: "Erreur lors de la requête à l'IA" });
	}
});

export default router;
