export interface Document {
  id: string;
  text: string;
  metadata: Record<string, any>;
}

export interface SearchResult {
  add(documents: Document[]): Promise<void>;
  search(query: string, k?: number): Promise<Document[]>;
}

export interface QueryResult {
  answer: string;
  sources: Document[];
}

export interface ParseResult {
  content: string;
  metadata: Record<string, any>;
}

export interface VectorStoreConfig {
  dimension: number;
}

export interface VectorStore {
  add(documents: Document[], embeddings: number[][]): Promise<void>;
  search(queryEmbedding: number[], k?: number): Promise<Document[]>;
  save(path: string): Promise<void>;
  load(path: string): Promise<void>;
} 