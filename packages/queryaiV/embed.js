"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSimilarTextInVectorStore = searchSimilarTextInVectorStore;
exports.addTextToVectorStore = addTextToVectorStore;
exports.embed = embed;
const shared_1 = require("@green-synapse/shared");
const data_1 = require("@green-synapse/data");
const index_1 = require("./index");
const path_1 = __importDefault(require("path"));
const vectorStore = new shared_1.VectorStore(1024);
const __dirname = path_1.default.resolve();
const localDatabasePath = path_1.default.join(__dirname, 'data/database.json');
async function generateEmbedding(text) {
    try {
        // Envoi de la requête d'embedding
        const response = await index_1.mistral.embeddings.create({
            inputs: [text],
        });
        // Si la réponse contient les embeddings, on les retourne
        if (response.data &&
            Array.isArray(response.data) &&
            response.data[0]?.embedding) {
            return response.data[0].embedding;
        }
        else {
            throw new Error("Réponse inattendue de l'API Mistral.");
        }
    }
    catch (error) {
        // Gestion des erreurs
        if (error?.response) {
            // Si l'erreur contient une réponse, on peut extraire des informations sur le statut HTTP
            const statusCode = error.response?.status;
            const errorMessage = error.response?.data?.message || 'Erreur inconnue';
            console.error(`Erreur API : ${statusCode} - ${errorMessage}`);
        }
        else if (error?.response?.statusCode === 429) {
            console.log(JSON.stringify(error));
            const retryAfter = 30;
            console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds...`);
            setTimeout(async () => await generateEmbedding(text), retryAfter * 1000);
        }
        else {
            console.error("Erreur lors de l'appel API :", error.message);
        }
        // Return an empty array or handle as appropriate for your use case
        return [];
    }
}
async function searchSimilarTextInVectorStore(query) {
    try {
        vectorStore.load(localDatabasePath);
        const embedding = await generateEmbedding(query);
        const results = vectorStore.search(embedding);
        console.log('Résultats de recherche :', results);
    }
    catch (error) {
        console.log('Erreur lors du chargement de ', localDatabasePath, error);
    }
}
async function addTextToVectorStore(id, text) {
    try {
        vectorStore.load(localDatabasePath);
        const embedding = await generateEmbedding(text);
        vectorStore.addVector(id, embedding);
        vectorStore.save(localDatabasePath);
    }
    catch (error) {
        console.log('addTextToVectorStore error :', error);
    }
}
async function embed(documents) {
    const store = new data_1.FaissVectorStore({ dimension: 768 });
    // ... rest of the embedding logic
    return store;
}
