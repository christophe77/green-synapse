"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mistral = void 0;
exports.default = queryAI;
exports.testMistralAPI = testMistralAPI;
const mistralai_1 = require("@mistralai/mistralai");
const dotenv_1 = __importDefault(require("dotenv"));
const ask_1 = __importDefault(require("./ask"));
const embed_1 = require("./embed");
dotenv_1.default.config();
const apiKey = process.env.MISTRAL_API_KEY;
exports.mistral = new mistralai_1.Mistral({ apiKey });
async function queryAI() {
    return {
        ask: (question, history) => (0, ask_1.default)(question, history),
        addTextToVectorStore: (id, text) => (0, embed_1.addTextToVectorStore)(id, text),
        searchSimilarTextInVectorStore: (query) => (0, embed_1.searchSimilarTextInVectorStore)(query),
    };
}
async function testMistralAPI() {
    try {
        const chatResponse = await exports.mistral.chat.complete({
            model: 'mistral-large-latest', // Make sure this model is available for your API key
            messages: [{ role: 'system', content: 'Test API connection' }],
        });
        console.log('Mistral API response:', chatResponse);
        return chatResponse;
    }
    catch (error) {
        console.error('Error with Mistral API:', error);
    }
}
