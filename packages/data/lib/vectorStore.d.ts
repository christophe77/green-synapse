declare class VectorStore {
    private index;
    private dimension;
    private vectors;
    private ids;
    constructor(dimension: number);
    addVector(id: string, vector: any[]): void;
    search(vector: any[], k?: number): {
        id: string;
        score: number;
    }[];
    save(filePath: string): void;
    load(filePath: string): void;
}
export { VectorStore };
