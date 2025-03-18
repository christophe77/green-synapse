# Green Synapse

Green Synapse combines the power and knowledge of artificial intelligence with specialized cannabis data. Whether you're interested in cultivation, cloning, genetics, effects, cannabinoids, or any other aspect, green synapse can provide you the information you need.

Based on a Mistral-based LLM together with specialized local documents, we can build useful tools for cannabis-related business.

## Features

- AI-powered cannabis information assistant
- Specialized knowledge base from Zamnesia and Royal Queen Seeds
- Web component for easy integration
- RESTful API for programmatic access

## Getting Started

### Prerequisites

- Node.js 20 or later
- pnpm 8 or later
- Docker (optional, for containerized deployment)

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/christophe77/green-synapse.git
cd green-synapse
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the packages:

```bash
pnpm build
```

4. Start the development server:

```bash
pnpm --filter @green-synapse/web dev
```

The application will be available at http://localhost:9000

### Docker Deployment

1. Build the Docker image:

```bash
docker build -t green-synapse .
```

2. Run the container:

```bash
docker run -p 9000:9000 green-synapse
```

Or using docker-compose:

```bash
docker-compose up -d
```

The application will be available at http://localhost:9000

## Project Structure

```
green-synapse/
├── packages/
│   ├── api/          # REST API server
│   ├── data/         # Data management and storage
│   ├── queryAI/      # AI query processing
│   ├── shared/       # Shared types and utilities
│   └── web-components/ # Web components library
├── web/              # Web application
├── Dockerfile        # Docker configuration
├── docker-compose.yml # Docker Compose configuration
└── package.json      # Root package configuration
```

## API Usage

### Ask a Question

```bash
curl -X POST http://localhost:9000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the best conditions for growing cannabis?"}'
```

### Add Text to Vector Store

```bash
curl -X POST http://localhost:9000/api/vector-store/add \
  -H "Content-Type: application/json" \
  -d '{"text": "Cannabis grows best in well-draining soil with pH between 6.0 and 7.0."}'
```

### Search Similar Text

```bash
curl -X POST http://localhost:9000/api/vector-store/search \
  -H "Content-Type: application/json" \
  -d '{"query": "soil pH for cannabis"}'
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
