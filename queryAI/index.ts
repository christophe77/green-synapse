import { Mistral } from '@mistralai/mistralai';
import dotenv from 'dotenv';
import ask from './ask';
import { addTextToVectorStore, searchSimilarTextInVectorStore } from './embed';

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;
export const mistral = new Mistral({ apiKey });

export default async function queryAI() {
	return {
		ask: (question: string) => ask(question),
		addTextToVectorStore: (id: string, text: string) =>
			addTextToVectorStore(id, text),
		searchSimilarTextInVectorStore: (query: string) =>
			searchSimilarTextInVectorStore(query),
	};
}
