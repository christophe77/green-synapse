"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SynWebComponent_1 = __importDefault(require("./components/Syn/SynWebComponent"));
customElements.define("my-syn", SynWebComponent_1.default);
