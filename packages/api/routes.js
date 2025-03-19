"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queryAI_1 = __importStar(require("../queryai"));
const router = express_1.default.Router();
router.post('/ask', async (req, res) => {
    const { question, messages } = req.body;
    try {
        // On appelle queryAI() qui retourne un objet contenant ask
        const ai = await (0, queryAI_1.default)();
        const aiResponse = await ai.ask(question, messages);
        // On vérifie si on a reçu une réponse valide
        if (typeof aiResponse === 'string') {
            return res.status(500).json({ error: aiResponse });
        }
        // On renvoie la réponse de l'IA et l'historique complet mis à jour
        return res.json({
            response: aiResponse.response,
            messages: aiResponse.messages,
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Erreur lors de la requête à l'IA" });
    }
});
router.get('/ask', async (_req, res) => {
    try {
        const response = await (0, queryAI_1.testMistralAPI)();
        res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ error: "Erreur lors de la requête à l'IA" });
    }
});
exports.default = router;
