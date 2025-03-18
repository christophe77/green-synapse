"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorStore = void 0;
const fs_1 = require("fs");
const faiss_node_1 = __importDefault(require("faiss-node"));
class VectorStore {
    constructor(dimension) {
        this.vectors = [];
        this.ids = [];
        this.dimension = dimension;
        this.index = new faiss_node_1.default.IndexFlatL2(dimension);
    }
    addVector(id, vector) {
        if (!(vector instanceof Array)) {
            console.log("Erreur: Le vecteur n'est pas un tableau.", vector);
            return;
        }
        // Vérifier si tous les éléments du vecteur sont des nombres
        if (!vector.every((item) => typeof item === 'number')) {
            console.log('Erreur: Le vecteur contient des éléments non numériques.', vector);
            return;
        }
        // Vérifier si la dimension du vecteur correspond à celle attendue
        if (vector.length !== this.dimension) {
            console.log(`Le vecteur doit avoir une dimension de ${this.dimension}, mais il a une dimension de ${vector.length}.`);
        }
        // Ajouter le vecteur
        this.index.add(vector);
        this.vectors.push(vector);
        this.ids.push(id);
    }
    search(vector, k = 5) {
        // Convertir le vecteur en tableau classique si nécessaire
        if (!(vector instanceof Array)) {
            vector = Array.from(vector);
        }
        // Vérification de la dimension du vecteur
        if (vector.length !== this.dimension) {
            console.log(`Le vecteur doit avoir une dimension de ${this.dimension}, mais il a une dimension de ${vector.length}.`);
        }
        const vectorArray = new Float32Array(vector);
        const { distances, labels } = this.index.search(vectorArray, k);
        // Retourner les résultats sous forme d'ID et de score
        return labels.map((label, labelIndex) => ({
            id: this.ids[label],
            score: distances[labelIndex],
        }));
    }
    save(filePath) {
        // Sauvegarder les vecteurs et leurs IDs dans un fichier JSON
        const data = {
            vectors: this.vectors,
            ids: this.ids,
        };
        (0, fs_1.writeFileSync)(filePath, JSON.stringify(data));
    }
    load(filePath) {
        if (!(0, fs_1.existsSync)(filePath)) {
            console.log("Le fichier d'index n'existe pas. Création d'un nouvel index.");
            (0, fs_1.writeFileSync)(filePath, JSON.stringify({ vectors: [], ids: [] }));
        }
        const data = JSON.parse((0, fs_1.readFileSync)(filePath, 'utf8'));
        if (!Array.isArray(data.vectors) || !Array.isArray(data.ids)) {
            console.log("Le fichier d'index est corrompu. 'vectors' et 'ids' doivent être des tableaux.");
            return;
        }
        this.vectors = data.vectors;
        this.ids = data.ids;
        // Vérifie si chaque vecteur est un tableau de nombres
        if (!this.vectors.every(vector => Array.isArray(vector) && vector.every(value => typeof value === 'number'))) {
            console.log("Le fichier d'index est corrompu, les vecteurs doivent être un tableau de tableaux de nombres.");
            return;
        }
        if (this.vectors.length > 0) {
            this.index = new faiss_node_1.default.IndexFlatL2(this.dimension);
            try {
                // On insère chaque vecteur individuellement
                for (const vector of this.vectors) {
                    // const flatVector = new Float32Array(vector);
                    this.index.add(vector);
                }
            }
            catch (error) {
                console.log("Erreur lors de l'ajout des vecteurs à FAISS :", error);
            }
        }
        else {
            console.log("Aucun vecteur trouvé dans le fichier d'index.");
        }
    }
}
exports.VectorStore = VectorStore;
