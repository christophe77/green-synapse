import { Document, VectorStore, VectorStoreConfig } from './types';

export class SimpleVectorStore implements VectorStore {
  private embeddings: number[][] = [];
  private documents: Document[] = [];

  constructor(_config: VectorStoreConfig) {
    // Validate dimension if needed
  }

  async add(documents: Document[], embeddings: number[][]): Promise<void> {
    this.documents.push(...documents);
    this.embeddings.push(...embeddings);
  }

  async search(queryEmbedding: number[], k: number = 4): Promise<Document[]> {
    const scores = this.embeddings.map(embedding => 
      this.cosineSimilarity(queryEmbedding, embedding)
    );
    
    const indices = this.topK(scores, k);
    return indices.map(idx => this.documents[idx]);
  }

  async save(_path: string): Promise<void> {
    // TODO: Implement save functionality
    throw new Error('Save functionality not implemented');
  }

  async load(_path: string): Promise<void> {
    // TODO: Implement load functionality
    throw new Error('Load functionality not implemented');
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (normA * normB);
  }

  private topK(arr: number[], k: number): number[] {
    return arr
      .map((val, idx) => ({ val, idx }))
      .sort((a, b) => b.val - a.val)
      .slice(0, k)
      .map(x => x.idx);
  }
} 