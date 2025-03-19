import { Mistral } from '@mistralai/mistralai';
export declare const mistral: Mistral;
export default function queryAI(): Promise<{
    ask: (question: string, history: any) => Promise<string | {
        response: string | null;
        messages: import("./ask").Message[];
    }>;
    addTextToVectorStore: (id: string, text: string) => Promise<void>;
    searchSimilarTextInVectorStore: (query: string) => Promise<void>;
}>;
export declare function testMistralAPI(): Promise<import("@mistralai/mistralai/models/components").ChatCompletionResponse | undefined>;
