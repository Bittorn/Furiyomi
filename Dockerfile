# Stage 1: Install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# Stage 2: Build the SvelteKit application
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application with the Node.js adapter
RUN npm run build

# Prune dev dependencies after build
RUN npm prune --omit=dev

# Stage 3: Production runtime
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 sveltekit
RUN adduser --system --uid 1001 sveltekit

# Copy the built application
COPY --from=builder --chown=sveltekit:sveltekit /app/build ./build

# Copy production dependencies
COPY --from=builder --chown=sveltekit:sveltekit /app/node_modules ./node_modules

# Copy package.json for module resolution
COPY --chown=sveltekit:sveltekit package.json .

USER sveltekit

EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

# Start the SvelteKit server
CMD ["node", "--enable-source-maps", "build/index.js"]

# Healthcheck
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1
