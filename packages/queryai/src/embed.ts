import { shared } from '@green-synapse/shared';
import { createMistralInstance } from './common.js';
import path from 'path';

export interface DocumentToHandle {
	id: string;
	text: string;
	metadata: Record<string, any>;
}

interface VectorStore {
	add(documents: DocumentToHandle[], embeddings: number[][]): Promise<void>;
	search(queryEmbedding: number[], k?: number): Promise<DocumentToHandle[]>;
	save(path: string): Promise<void>;
	load(path: string): Promise<void>;
}
const { vectorStore } = shared;

const simpleVectorStore = new vectorStore.SimpleVectorStore({ dimension: 1024 });
const dirname = path.resolve();
const localDatabasePath = path.join(dirname, 'data/database.json');

async function generateEmbedding(text: string): Promise<number[]> {
	const mistral = createMistralInstance();
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
): Promise<DocumentToHandle[]> {
	try {
		await simpleVectorStore.load(localDatabasePath);
		const embedding = await generateEmbedding(query);
		return await simpleVectorStore.search(embedding);
	} catch (error) {
		console.log('Erreur lors du chargement de ', localDatabasePath, error);
		return [];
	}
}

export async function addTextToVectorStore(
	id: string,
	text: string,
): Promise<void> {
	try {
		await simpleVectorStore.load(localDatabasePath);
		const embedding = await generateEmbedding(text);
		const doc = { id, text, metadata: {} };
		await simpleVectorStore.add([doc], [embedding]);
		await simpleVectorStore.save(localDatabasePath);
	} catch (error) {
		console.log('addTextToVectorStore error :', error);
	}
}

export async function embed(documents: DocumentToHandle[]): Promise<VectorStore> {
	const store = new vectorStore.SimpleVectorStore({ dimension: 768 });
	const embeddings = await Promise.all(
		documents.map(doc => generateEmbedding(doc.text))
	);
	await store.add(documents, embeddings);
	return store;
}
