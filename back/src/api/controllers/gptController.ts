import { NextFunction, Request, Response } from 'express';
import { generateResponse, generateSuggestion } from '../services/gptService';

export const askQuestion = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { question } = req.body;

	if (!question) {
		next("err");
	}

	try {
		const response = await generateResponse(question);
		const suggestion = await generateSuggestion(question);

		res.json({
			response,
			suggestion,
		});
	} catch (error) {
		console.error('Erreur lors du traitement de la requête:', error);
		res.status(500).json({
			error: 'Une erreur est survenue pendant le traitement de la question.',
		});
	}
};
