import ask from './ask.js';
import {
	addTextToVectorStore,
	searchSimilarTextInVectorStore,
} from './embed.js';

export interface QueryAI {
	ask: (
		question: string,
		history: any,
	) => Promise<string | { response: string | null; messages: any[] }>;
	addTextToVectorStore: (id: string, text: string) => Promise<void>;
	searchSimilarTextInVectorStore: (query: string) => Promise<any>;
}

export default function queryAI(): QueryAI {
	return {
		ask: (question, history) => ask(question, history),
		addTextToVectorStore: (id, text) => addTextToVectorStore(id, text),
		searchSimilarTextInVectorStore: (query) =>
			searchSimilarTextInVectorStore(query),
	};
}
