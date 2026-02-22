# Deployment Guide - Infinity Algo by Jeremy

This guide provides step-by-step instructions for deploying the Infinity Algo trading platform.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Vercel Deployment (Recommended)](#vercel-deployment)
3. [Docker Deployment](#docker-deployment)
4. [Manual VPS Deployment](#manual-vps-deployment)
5. [Environment Variables](#environment-variables)
6. [Database Setup](#database-setup)
7. [Post-Deployment](#post-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- GitHub account
- Vercel account (free tier works)
- Supabase account (free tier works)
- Domain name (optional, but recommended)

---

## Vercel Deployment

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Infinity Algo Platform"

# Add remote (replace with your repo)
git remote add origin https://github.com/YOUR_USERNAME/infinity-algo.git

# Push to GitHub
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `bun run build`
   - Output Directory: `.next`

### Step 3: Configure Environment Variables

In Vercel dashboard, go to Settings > Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=Infinity Algo
```

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

### Step 5: Custom Domain (Optional)

1. Go to Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning

---

## Docker Deployment

### Build Docker Image

```bash
# Build the image
docker build -t infinity-algo:latest .

# Tag for registry
docker tag infinity-algo:latest your-registry/infinity-algo:latest

# Push to registry
docker push your-registry/infinity-algo:latest
```

### Run with Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    image: infinity-algo:latest
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

Run:

```bash
docker-compose up -d
```

---

## Manual VPS Deployment

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Bun
curl -fsSL https://bun.sh/install | bash

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### Step 2: Clone and Build

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/infinity-algo.git
cd infinity-algo

# Install dependencies
bun install

# Build
bun run build

# Create .env.local with your variables
nano .env.local
```

### Step 3: Start with PM2

```bash
# Start the application
pm2 start bun --name "infinity-algo" -- run start

# Save PM2 config
pm2 save

# Enable PM2 startup
pm2 startup
```

### Step 4: Configure Nginx

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/infinity-algo
```

Add:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable:

```bash
sudo ln -s /etc/nginx/sites-available/infinity-algo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | `eyJ...` |
| `NEXT_PUBLIC_APP_URL` | Your app URL | `https://infinityalgo.com` |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |
| `STRIPE_SECRET_KEY` | Stripe API key for payments |
| `RESEND_API_KEY` | Resend API key for emails |

---

## Database Setup

### Supabase Tables

Create these tables in Supabase:

```sql
-- Users table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trades table
CREATE TABLE trades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  symbol TEXT NOT NULL,
  type TEXT NOT NULL,
  entry_price DECIMAL(18,5),
  exit_price DECIMAL(18,5),
  lot_size DECIMAL(18,4),
  stop_loss DECIMAL(18,5),
  take_profit DECIMAL(18,5),
  profit_loss DECIMAL(18,4),
  notes TEXT,
  tags TEXT[],
  screenshot_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Journal entries
CREATE TABLE journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  content TEXT,
  mood TEXT,
  market_conditions TEXT,
  lessons_learned TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved setups
CREATE TABLE saved_setups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  symbol TEXT,
  timeframe TEXT,
  description TEXT,
  chart_image_url TEXT,
  setup_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Enable Row Level Security

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_setups ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage own trades" ON trades
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own journal" ON journal_entries
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own setups" ON saved_setups
  FOR ALL USING (auth.uid() = user_id);
```

---

## Post-Deployment

### Verify Deployment

1. Visit your domain
2. Test all features:
   - [ ] Navigation works
   - [ ] Charts load
   - [ ] Calculators function
   - [ ] AI assistant responds
   - [ ] Forms submit
   - [ ] Mobile responsive

### Set Up Monitoring

1. Enable Vercel Analytics
2. Set up error tracking (Sentry recommended)
3. Configure uptime monitoring (UptimeRobot)

### Performance Optimization

1. Enable Vercel Edge Functions
2. Configure CDN caching
3. Optimize images

---

## Troubleshooting

### Common Issues

**Build Fails**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
bun install
bun run build
```

**Environment Variables Not Loading**
- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new variables

**Database Connection Issues**
- Verify Supabase URL and keys
- Check IP whitelisting
- Ensure RLS policies are correct

**API Routes Not Working**
- Check function timeout settings
- Verify route handlers export correct methods

### Getting Help

- GitHub Issues: [Report a bug](https://github.com/YOUR_USERNAME/infinity-algo/issues)
- Email: support@infinityalgo.com
- Discord: [Join Community](https://discord.gg/infinityalgo)

---

**Happy Trading! 🚀**
