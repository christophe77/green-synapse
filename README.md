/_
Green Synapse - Universal AI Platform
Language: TypeScript
Description: A modular, scalable AI platform for cannabis-related knowledge and assistance.
_/

// Root Project Structure

{
"name": "green-synapse",
"version": "0.1.0",
"private": true,
"type": "module",
"workspaces": [
"shared/*",
"front/*",
"back/*",
"data/*"
],
"scripts": {
"build": "tsc -b",
"start": "node back/API/dist/index.js",
"start:knowledge": "tsc && node back/knowledge/index.js",
"lint": "eslint .",
"format": "prettier --write ."
},
"dependencies": {
"express": "^4.18.0",
"html-pdf-chrome": "^1.0.0",
"jsdom": "^22.0.0"
},
"devDependencies": {
"typescript": "^5.0.0",
"eslint": "^8.0.0",
"prettier": "^2.0.0",
"tailwindcss": "^4.0.0",
"ts-node": "^10.0.0",
"@types/node": "^18.0.0",
"@types/jsdom": "^22.0.0"
}
}

// Root tsconfig.json (Newly Added)
{
"extends": "./shared/tsconfig.base.json",
"files": [],
"include": ["back/**/*.ts", "front/**/*.ts"],
"exclude": ["node_modules", "dist"]
}

// Folder Structure

/shared

- tsconfig.base.json (Base TypeScript configuration)
- eslint.config.js (Base ESLint configuration)
- prettier.config.js (Prettier configuration)

/front
/website - index.html (Basic HTML structure) - main.js (JavaScript entry point)

/syn - index.ts (Universal web component entry point) - syn-component.ts (Main Syn Component for the agent)

/design-system - index.ts (Design system entry point) - button.ts (Reusable button component) - card.ts (Reusable card component)

/back
/api - index.ts (REST API entry point) - routes.ts (Route definitions)

/knowledge - index.ts (Main entry for knowledge scripts) - parse.ts (Document parsing script) - scrape.ts (Document scraping script) - transform.ts (Document transformation script using './types/index') - types/index.ts (Custom types definition)

/data

- knowledge.json (JSON file with predefined knowledge)
- documents/ (Folder for PDFs, databases, etc.)
