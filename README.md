# Green Synapse

A modular TypeScript project for building AI-powered cannabis-related applications with vector search capabilities.

## Architecture

The project is organized into several packages:

### Core Packages

- `@green-synapse/shared`: Core types and utilities shared across packages

  - Defines common interfaces like `Document`, `VectorStore`, etc.
  - Implements the `SimpleVectorStore` for vector similarity search

- `@green-synapse/data`: Data processing and storage

  - Handles document parsing and transformation
  - Manages PDF generation and storage
  - Provides vector store functionality through shared package

- `@green-synapse/queryai`: AI and query processing

  - Integrates with Mistral AI for embeddings and chat
  - Manages vector search operations
  - Provides high-level query interface

- `@green-synapse/api`: REST API server
  - Exposes endpoints for AI interactions
  - Handles request/response formatting
  - Manages error handling and middleware

### Supporting Packages

- `@green-synapse/web-components`: Frontend components
- `@green-synapse/static-server`: Static file serving
- `@green-synapse/pwa`: Progressive Web App functionality

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file in the root directory with:

```
MISTRAL_API_KEY=your_api_key_here
API_PORT=3000
```

## Development

### Building the Project

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @green-synapse/api build
```

### Running in Development Mode

```bash
# Start the API server
pnpm --filter @green-synapse/api dev

# Start the static server
pnpm --filter @green-synapse/static-server dev
```

## API Usage

### Chat Endpoint

```bash
# Send a chat message
curl -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is cannabis?", "messages": []}'

# Test Mistral API connection
curl http://localhost:3000/api/ask
```

### Vector Store Operations

The vector store provides the following operations:

```typescript
// Add text to vector store
await queryAI().addTextToVectorStore('doc_id', 'text content');

// Search similar texts
const results = await queryAI().searchSimilarTextInVectorStore('query text');
```

## Project Structure

```
green-synapse/
├── packages/
│   ├── shared/           # Core types and utilities
│   ├── data/            # Data processing and storage
│   ├── queryai/         # AI and query processing
│   ├── api/             # REST API server
│   ├── web-components/  # Frontend components
│   ├── static-server/   # Static file serving
│   └── pwa/             # Progressive Web App
├── tsconfig.json        # Root TypeScript configuration
└── package.json         # Root package configuration
```

## Dependencies

- TypeScript
- Express.js
- Mistral AI
- PDF Generation
- Vector Search

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is private and proprietary.
