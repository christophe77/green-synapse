import fs from 'fs';
import path from 'path';
import express, { Request, Response, Router } from 'express';

const apiRouter: Router = express.Router();

apiRouter.post('/ask', async (req: Request, res: Response) => {
	const { question, messages } = req.body;

	try {
		// Dynamically import the 'queryAI' ES Module here
		const { default: queryAI } = await import('@green-synapse/queryai');
		const aiResponse = await queryAI().ask(question, messages);

		if (typeof aiResponse === 'string') {
			return res.status(500).json({ error: aiResponse });
		}
		return res.json({
			response: aiResponse.response,
			messages: aiResponse.messages,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Error requesting AI' });
	}
});
apiRouter.post('/strain/autocomplete', async (req: Request, res: Response) => {
	const { strainNameChunk, limit = 10 } = req.body;
	const __dirname = path.dirname(__filename);
	try {
		const fullStrainList = await fs.promises.readFile(
			path.join(__dirname, '../data/leafly_strain_data.json'),
			'utf-8',
		);
		const parsedList = JSON.parse(fullStrainList);

		const filteredList = parsedList
			.filter((strain: any) =>
				strain.name.toLowerCase().includes(strainNameChunk.toLowerCase()),
			)
			.slice(0, limit);

		return res.json({
			strains: filteredList,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: 'Error reading JSON file for autocomplete' });
	}
});

export default apiRouter;
