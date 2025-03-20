import { Mistral } from '@mistralai/mistralai';
import { config } from 'dotenv';
import { resolve } from 'path';

export function createMistralInstance(): Mistral {
	const envPath = resolve(__dirname, '../../../.env');
	const result = config({ path: envPath });

	const apiKey = result.parsed?.MISTRAL_API_KEY;
	console.log('using api key', apiKey);
	const mistral = new Mistral({ apiKey });
	return mistral;
}
