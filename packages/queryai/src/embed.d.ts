import { Document, VectorStore } from '@green-synapse/shared';
export declare function searchSimilarTextInVectorStore(query: string): Promise<void>;
export declare function addTextToVectorStore(id: string, text: string): Promise<void>;
export declare function embed(documents: Document[]): Promise<VectorStore>;
