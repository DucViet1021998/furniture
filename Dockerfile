# Install dependencies only when needed
FROM node:18-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

# Rebuild the source code only when needed
FROM node:18-slim AS builder
ARG NEXT_ENVIRONMENT
ENV NODE_ENV $NEXT_ENVIRONMENT
ENV NEXT_PUBLIC_ENV $NEXT_ENVIRONMENT
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY .env.production ./ 
COPY . .

RUN npm run build

# Production image, copy only necessary files
FROM node:18-slim AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary build files to production image
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.production ./ 

USER nextjs

EXPOSE 3077
ENV PORT 3077

CMD ["npx", "next", "start", "-p", "3077"]
