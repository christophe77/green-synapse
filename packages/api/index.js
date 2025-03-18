"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error to the console
    res.status(500).json({ error: 'An error occurred', details: err.message });
});
app.use('/api', routes_1.default);
const port = process.env.API_PORT ?? 3000;
app.listen(port, () => {
    console.log(`Green Synapse API running on port ${port}`);
});
