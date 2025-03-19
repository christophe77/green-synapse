import { Mistral } from '@mistralai/mistralai';
import { config } from 'dotenv';
import { resolve } from 'path';
import ask from './ask';
import { addTextToVectorStore, searchSimilarTextInVectorStore } from './embed';

// Charger le fichier .env depuis le répertoire racine du projet
const envPath = resolve(__dirname, '../../../.env');
const result = config({ path: envPath });

const apiKey = result.parsed?.MISTRAL_API_KEY;

console.log('using api key', apiKey);
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

