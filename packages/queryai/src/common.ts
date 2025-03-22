import { Mistral } from '@mistralai/mistralai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../../../.env` });

export function createMistralInstance(): Mistral {
	let apiKey = 'empty';
	try {
		const apiKey = process.env?.MISTRAL_API_KEY;
		console.log('using api key', apiKey);
		const mistral = new Mistral({ apiKey });
		return mistral;
	} catch (error) {
		console.log('Error creating Mistral instance with key', apiKey, error);
		const noApiKeyMistral = new Mistral({ apiKey });
		return noApiKeyMistral;
	}
}
