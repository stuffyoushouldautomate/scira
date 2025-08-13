# syntax=docker.io/docker/dockerfile:1

# Base image: Using Node.js 22 with Alpine Linux for a minimal footprint
FROM node:22-alpine AS base

# Stage 1: Dependencies
# This stage is responsible for installing all npm dependencies
FROM base AS deps
# Installing libc6-compat for Alpine Linux compatibility with certain Node.js packages
# Required for some npm packages that have native dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files and install dependencies using pnpm
# pnpm is used for faster and more efficient package management
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Stage 2: Building the application
# This stage builds the Next.js application
FROM base AS builder
WORKDIR /app

# Accept build arguments for environment variables
ARG OPENAI_API_KEY
ARG ANTHROPIC_API_KEY
ARG GROQ_API_KEY
ARG GOOGLE_GENERATIVE_AI_API_KEY
ARG DAYTONA_API_KEY
ARG DATABASE_URL
ARG REDIS_URL
ARG XAI_API_KEY
ARG ELEVENLABS_API_KEY
ARG TAVILY_API_KEY
ARG EXA_API_KEY
ARG VALYU_API_KEY
ARG TMDB_API_KEY
ARG FIRECRAWL_API_KEY
ARG OPENWEATHER_API_KEY
ARG GOOGLE_MAPS_API_KEY
ARG AMADEUS_API_KEY
ARG AMADEUS_API_SECRET
ARG CRON_SECRET
ARG BLOB_READ_WRITE_TOKEN
ARG MEM0_API_KEY
ARG MEM0_ORG_ID
ARG MEM0_PROJECT_ID
ARG SMITHERY_API_KEY
ARG QSTASH_TOKEN
ARG RESEND_API_KEY
ARG BETTER_AUTH_SECRET
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG TWITTER_CLIENT_ID
ARG TWITTER_CLIENT_SECRET
ARG ALLOWED_ORIGINS

# Set environment variables for build
ENV OPENAI_API_KEY=$OPENAI_API_KEY
ENV ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY
ENV GROQ_API_KEY=$GROQ_API_KEY
ENV GOOGLE_GENERATIVE_AI_API_KEY=$GOOGLE_GENERATIVE_AI_API_KEY
ENV DAYTONA_API_KEY=$DAYTONA_API_KEY
ENV DATABASE_URL=$DATABASE_URL
ENV REDIS_URL=$REDIS_URL
ENV XAI_API_KEY=$XAI_API_KEY
ENV ELEVENLABS_API_KEY=$ELEVENLABS_API_KEY
ENV TAVILY_API_KEY=$TAVILY_API_KEY
ENV EXA_API_KEY=$EXA_API_KEY
ENV VALYU_API_KEY=$VALYU_API_KEY
ENV TMDB_API_KEY=$TMDB_API_KEY
ENV FIRECRAWL_API_KEY=$FIRECRAWL_API_KEY
ENV OPENWEATHER_API_KEY=$OPENWEATHER_API_KEY
ENV GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY
ENV AMADEUS_API_KEY=$AMADEUS_API_KEY
ENV AMADEUS_API_SECRET=$AMADEUS_API_SECRET
ENV CRON_SECRET=$CRON_SECRET
ENV BLOB_READ_WRITE_TOKEN=$BLOB_READ_WRITE_TOKEN
ENV MEM0_API_KEY=$MEM0_API_KEY
ENV MEM0_ORG_ID=$MEM0_ORG_ID
ENV MEM0_PROJECT_ID=$MEM0_PROJECT_ID
ENV SMITHERY_API_KEY=$SMITHERY_API_KEY
ENV QSTASH_TOKEN=$QSTASH_TOKEN
ENV RESEND_API_KEY=$RESEND_API_KEY
ENV BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
ENV GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID
ENV GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV TWITTER_CLIENT_ID=$TWITTER_CLIENT_ID
ENV TWITTER_CLIENT_SECRET=$TWITTER_CLIENT_SECRET
ENV ALLOWED_ORIGINS=$ALLOWED_ORIGINS

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all source files
COPY . .
# Copy environment variables for build configuration (optional for Railway)
COPY .env* ./
# Build the Next.js application directly
RUN corepack enable pnpm && pnpm run build

# Stage 3: Production runtime
# Final stage that runs the application
FROM base AS runner
LABEL org.opencontainers.image.name="scira.app"
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy only the necessary files for running the application
# Static files for serving
COPY --from=builder /app/public ./public

# Copy the standalone build output and static files
# Using Next.js output tracing to minimize the final image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user for security
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Configure the server
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the Next.js application
CMD ["node", "server.js"]
