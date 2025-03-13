export interface CannabisStrain {
    name: string;
    type: 'Indica' | 'Sativa' | 'Hybrid';
    effects: string[];
    medicalUses: string[];
    growDifficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
  }

export type SearchResult = {
    document: string;  // Le texte du document correspondant
    id: number;        // L'identifiant du document
    score: number;      // Le score de pertinence (optionnel, mais souvent présent)
  };
  
export type Results = SearchResult[];