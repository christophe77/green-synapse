import { mistral } from './index';
import { VectorStore } from '../data/lib/vectorStore';
import path from 'path';

const vectorStore = new VectorStore(1024);
const __dirname = path.resolve();
const localDatabasePath = path.join(__dirname, 'data/database.json');

async function generateEmbedding(text: string): Promise<number[]> {
	try {
		// Envoi de la requête d'embedding
		const response = await mistral.embeddings.create({
			inputs: [text],
		});

		// Si la réponse contient les embeddings, on les retourne
		if (
			response.data &&
			Array.isArray(response.data) &&
			response.data[0]?.embedding
		) {
			return response.data[0].embedding;
		} else {
			throw new Error("Réponse inattendue de l'API Mistral.");
		}
	} catch (error: any) {
		// Gestion des erreurs
		if (error?.response) {
			// Si l'erreur contient une réponse, on peut extraire des informations sur le statut HTTP
			const statusCode = error.response?.status;
			const errorMessage = error.response?.data?.message || 'Erreur inconnue';
			console.error(`Erreur API : ${statusCode} - ${errorMessage}`);
		} else if (error?.response?.statusCode === 429) {
			console.log(JSON.stringify(error));
			const retryAfter = 30;
			console.log(
				`Rate limit exceeded. Retrying after ${retryAfter} seconds...`,
			);
			setTimeout(async () => await generateEmbedding(text), retryAfter * 1000);
		} else {
			console.error("Erreur lors de l'appel API :", error.message);
		}
		// Return an empty array or handle as appropriate for your use case
		return [];
	}
}

export async function searchSimilarTextInVectorStore(
	query: string,
): Promise<void> {
	try {
		vectorStore.load(localDatabasePath);
		const embedding = await generateEmbedding(query);
		const results = vectorStore.search(embedding);
		console.log('Résultats de recherche :', results);
	} catch (error) {
		console.log('Erreur lors du chargement de ', localDatabasePath, error);
	}
}
export async function addTextToVectorStore(
	id: string,
	text: string,
): Promise<void> {
	try {
		vectorStore.load(localDatabasePath);
		const embedding = await generateEmbedding(text);
		vectorStore.addVector(id, embedding);
		vectorStore.save(localDatabasePath);
	} catch (error) {
		console.log('addTextToVectorStore error :', error);
	}
}
