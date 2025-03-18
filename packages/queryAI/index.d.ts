import { Document } from '@green-synapse/shared';

interface AIResponse {
    response: string;
    messages: any[];
}

interface QueryAI {
    ask: (question: string, history: any) => Promise<AIResponse>;
    addTextToVectorStore: (id: string, text: string) => Promise<void>;
    searchSimilarTextInVectorStore: (query: string) => Promise<Document[]>;
}

declare function queryAI(): Promise<QueryAI>;

export default queryAI;
export function testMistralAPI(): Promise<any>; 