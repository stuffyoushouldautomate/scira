# Railway Deployment Guide for Bulldozer Brain

## Quick Deploy Options

### Option 1: Deploy via GitHub (Recommended)
1. **Connect your GitHub repo** to Railway:
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `stuffyoushouldautomate/bulldozer-brain`
   - Railway will automatically detect the Dockerfile and build

2. **No Additional Services Needed**:
   - You already have PostgreSQL on Railway (`mainline.proxy.rlwy.net`)
   - You already have Upstash Redis configured
   - Just deploy your app directly!

3. **Set Environment Variables**:
   - In Railway dashboard, go to your project → Variables
   - Add all required environment variables from your `.env` file
   - **Important**: Set `NEXT_PUBLIC_APP_URL=https://bulldozer-brain-production.up.railway.app`
   - Set `NODE_ENV=production`
   - **Note**: `DATABASE_URL` and `REDIS_URL` are already configured in your environment

### Option 2: Deploy via Railway CLI
1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Deploy**:
   ```bash
   railway up
   ```

## Railway Services Required

### 1. Your App Service (Main Service)
- **Purpose**: Main Next.js application for Bulldozer Brain
- **Setup**: Automatically created when you connect GitHub repo
- **Build**: Uses your Dockerfile for containerized deployment

### 2. Existing Services (Already Configured)
- **PostgreSQL**: Already hosted on Railway infrastructure (`mainline.proxy.rlwy.net`)
- **Redis**: Already using Upstash Redis (`amusing-bonefish-49567.upstash.io`)
- **No additional services needed** - just deploy your app!

## Environment Variables for Production

### Required Variables
```bash
# Core AI APIs
XAI_API_KEY=your_xai_api_key
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
GROQ_API_KEY=your_groq_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
DAYTONA_API_KEY=your_daytona_api_key

# Database & Storage
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
BLOB_READ_WRITE_TOKEN=your_blob_token

# Authentication
BETTER_AUTH_SECRET=your_auth_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret

# Production URLs
NEXT_PUBLIC_APP_URL=https://bulldozer-brain-production.up.railway.app
NODE_ENV=production
RAILWAY_ENVIRONMENT=production
```

### Optional Variables (Add if you need these features)
```bash
# Payment Processing
DODO_PAYMENTS_API_KEY=your_dodo_api_key
DODO_PAYMENTS_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_PREMIUM_TIER=your_premium_tier
NEXT_PUBLIC_PREMIUM_SLUG=your_premium_slug
NEXT_PUBLIC_STARTER_TIER=your_starter_tier
NEXT_PUBLIC_STARTER_SLUG=your_starter_slug

# Additional Services
TAVILY_API_KEY=your_tavily_key
EXA_API_KEY=your_exa_key
FIRECRAWL_API_KEY=your_firecrawl_key
TMDB_API_KEY=your_tmdb_key
ELEVENLABS_API_KEY=your_elevenlabs_key
OPENWEATHER_API_KEY=your_openweather_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## Local Development vs Production

### Local Development
- Uses `.env` file with `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- `RAILWAY_ENVIRONMENT=development`
- `NODE_ENV=development`

### Production (Railway)
- Uses Railway environment variables
- `NEXT_PUBLIC_APP_URL=https://bulldozer-brain-production.up.railway.app`
- `RAILWAY_ENVIRONMENT=production`
- `NODE_ENV=production`

## Build & Deploy Process

1. **Railway automatically**:
   - Detects the `Dockerfile`
   - Builds the Docker image
   - Deploys to `bulldozer-brain-production.up.railway.app`

2. **Environment handling**:
   - Railway injects environment variables during build
   - `.env` file is only used for local development
   - Production uses Railway's environment variable system

## Monitoring & Updates

- **Auto-deploy**: Every push to main branch triggers deployment
- **Build logs**: Available in Railway dashboard
- **Environment variables**: Managed through Railway dashboard
- **Scaling**: Automatic scaling based on traffic

## About Bulldozer Brain

Bulldozer Brain is a specialized AI-powered research tool designed specifically for **labor union organizers** in **New Jersey** and **New York**. It helps organizers research companies, analyze labor practices, track violations, and gain detailed insights to support their organizing efforts.

The tool provides:
- **Company research** and analysis
- **Labor violation tracking**
- **Wage and benefit analysis**
- **Regulatory compliance research**
- **Executive and ownership research**
- **Industry analysis** for construction, manufacturing, and service sectors

Perfect for union organizers who need to research companies, track labor practices, and gather evidence for organizing campaigns and negotiations.
