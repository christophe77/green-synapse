import express, { Request, Response } from 'express';
import queryAI, { testMistralAPI } from '../queryAI';

const router = express.Router();

router.post('/ask', async (req: Request, res: Response) => {
	const { question, messages } = req.body;

	try {
		// On appelle queryAI() qui retourne un objet contenant ask
		const ai = await queryAI();
		const aiResponse = await ai.ask(question, messages);

		// On vérifie si on a reçu une réponse valide
		if (typeof aiResponse === 'string') {
			return res.status(500).json({ error: aiResponse });
		}

		// On renvoie la réponse de l'IA et l'historique complet mis à jour
		return res.json({
			response: aiResponse.response,
			messages: aiResponse.messages,
		});
	} catch (error) {
		return res.status(500).json({ error: "Erreur lors de la requête à l'IA" });
	}
});
router.get('/ask', async (_req, res) => {
	try {
		const response = await testMistralAPI();
		res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({ error: "Erreur lors de la requête à l'IA" });
	}
});
export default router;
