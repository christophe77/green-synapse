# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/api/package.json ./packages/api/
COPY packages/data/package.json ./packages/data/
COPY packages/queryAI/package.json ./packages/queryAI/
COPY packages/shared/package.json ./packages/shared/
COPY packages/web-components/package.json ./packages/web-components/
COPY web/package.json ./web/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build all packages
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files and built files
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/api/package.json ./packages/api/
COPY --from=builder /app/packages/api/dist ./packages/api/dist
COPY --from=builder /app/packages/data/package.json ./packages/data/
COPY --from=builder /app/packages/data/dist ./packages/data/dist
COPY --from=builder /app/packages/queryAI/package.json ./packages/queryAI/
COPY --from=builder /app/packages/queryAI/dist ./packages/queryAI/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/web-components/package.json ./packages/web-components/
COPY --from=builder /app/packages/web-components/dist ./packages/web-components/dist
COPY --from=builder /app/web/package.json ./web/
COPY --from=builder /app/web/dist ./web/dist
COPY --from=builder /app/web/pages ./web/pages

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Expose ports
EXPOSE 9000

# Start the server
CMD ["node", "web/dist/server.js"] 