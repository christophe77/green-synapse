import ask from './ask';
import { addTextToVectorStore, searchSimilarTextInVectorStore } from './embed';

export default async function queryAI() {
	return {
		ask: (question: string, history: any) => ask(question, history),
		addTextToVectorStore: (id: string, text: string) =>
			addTextToVectorStore(id, text),
		searchSimilarTextInVectorStore: (query: string) =>
			searchSimilarTextInVectorStore(query),
	};
}

