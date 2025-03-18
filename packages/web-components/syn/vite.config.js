"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const path_1 = require("path");
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    build: {
        lib: {
            formats: ['es', 'umd'],
            entry: (0, path_1.resolve)(__dirname, 'src/index.ts'),
            name: 'index',
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react-markdown', 'framer-motion'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                },
            },
        },
    },
    server: {
        open: true,
        strictPort: true,
        allowedHosts: ['vps-32f8344e.vps.ovh.net', 'localhost', '51.75.124.64']
    }
});
