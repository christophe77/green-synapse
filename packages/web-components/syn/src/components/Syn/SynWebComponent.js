"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = __importDefault(require("react-dom/client"));
const Syn_1 = __importDefault(require("./Syn"));
const SynComponent = () => {
    return <Syn_1.default />;
};
class SynWebComponent extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        const mountPoint = document.createElement('div');
        shadow.appendChild(mountPoint);
        const root = client_1.default.createRoot(mountPoint);
        root.render(<react_1.StrictMode>
				<SynComponent />
			</react_1.StrictMode>);
    }
}
exports.default = SynWebComponent;
