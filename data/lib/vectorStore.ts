import { writeFileSync, readFileSync, existsSync } from 'fs';
import Faiss from 'faiss-node';

class VectorStore {
	private index: any;
	private dimension: number;
	private vectors: number[][] = [];
	private ids: string[] = [];

	constructor(dimension: number) {
		this.dimension = dimension;
		this.index = new Faiss.IndexFlatL2(dimension);
	}

	addVector(id: string, vector: any[]): void {
		if (!(vector instanceof Array)) {
			console.log("Erreur: Le vecteur n'est pas un tableau.", vector);
			return;
		}

		// Vérifier si tous les éléments du vecteur sont des nombres
		if (!vector.every((item) => typeof item === 'number')) {
			console.log(
				'Erreur: Le vecteur contient des éléments non numériques.',
				vector,
			);
			return;
		}

		// Vérifier si la dimension du vecteur correspond à celle attendue
		if (vector.length !== this.dimension) {
			throw new Error(
				`Le vecteur doit avoir une dimension de ${this.dimension}, mais il a une dimension de ${vector.length}.`,
			);
		}

		// Ajouter le vecteur
		this.index.add(vector);
		this.vectors.push(vector);
		this.ids.push(id);
	}

	search(vector: any[], k: number = 5): { id: string; score: number }[] {
		// Convertir le vecteur en tableau classique si nécessaire
		if (!(vector instanceof Array)) {
			vector = Array.from(vector);
		}
		// Vérification de la dimension du vecteur
		if (vector.length !== this.dimension) {
			throw new Error(
				`Le vecteur doit avoir une dimension de ${this.dimension}, mais il a une dimension de ${vector.length}.`,
			);
		}

		const vectorArray = new Float32Array(vector);
		const { distances, labels } = this.index.search(vectorArray, k);
		// Retourner les résultats sous forme d'ID et de score
		return labels.map((label: number, labelIndex: number) => ({
			id: this.ids[label],
			score: distances[labelIndex],
		}));
	}

	save(filePath: string): void {
		// Sauvegarder les vecteurs et leurs IDs dans un fichier JSON
		const data = {
			vectors: this.vectors,
			ids: this.ids,
		};
		writeFileSync(filePath, JSON.stringify(data));
	}

	load(filePath: string): void {
		if (!existsSync(filePath)) {
			console.log(
				"Le fichier d'index n'existe pas. Création d'un nouvel index.",
			);
			writeFileSync(filePath, JSON.stringify({ vectors: [], ids: [] }));
			return;
		}

		const data = JSON.parse(readFileSync(filePath, 'utf8'));
		this.vectors = data.vectors;
		this.ids = data.ids;
		if (!Array.isArray(this.vectors)) {
			throw new Error(
				"Le fichier d'index est corrompu, les vecteurs doivent être un tableau.",
			);
		}

		if (this.vectors.length > 0 && !Array.isArray(this.vectors[0])) {
			const vectorLength = this.dimension;
			const flattened = this.vectors;
			this.vectors = [];

			for (let i = 0; i < flattened.length; i += vectorLength) {
				const vector = flattened.slice(i, i + vectorLength);
				this.vectors.push(vector);
			}
		}

		if (!this.vectors.every(Array.isArray)) {
			throw new Error('Les vecteurs doivent être un tableau de tableaux.');
		}

		const flatVectors = this.vectors.flat();

		if (flatVectors.length > 0) {
			this.index = new Faiss.IndexFlatL2(this.dimension);
			this.index.add(new Float32Array(flatVectors));
		} else {
			console.log("Il n'y a pas de vecteurs valides à ajouter à l'index.");
		}
	}
}

export { VectorStore };
