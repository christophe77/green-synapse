import { Mistral } from '@mistralai/mistralai';
import dotenv from 'dotenv';
import ask from './ask';
import { addTextToVectorStore, searchSimilarTextInVectorStore } from './embed';

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;

export const mistral = new Mistral({ apiKey });

export default async function queryAI() {
	return {
		ask: (question: string, history: any) => ask(question, history),
		addTextToVectorStore: (id: string, text: string) =>
			addTextToVectorStore(id, text),
		searchSimilarTextInVectorStore: (query: string) =>
			searchSimilarTextInVectorStore(query),
	};
}

export async function testMistralAPI() {
	try {
		const chatResponse = await mistral.chat.complete({
			model: 'mistral-large-latest', // Make sure this model is available for your API key
			messages: [{ role: 'system', content: 'Test API connection' }],
		});
		console.log('Mistral API response:', chatResponse);
		return chatResponse;
	} catch (error) {
		console.error('Error with Mistral API:', error);
		return null; // Return null in case of error
	}
}
