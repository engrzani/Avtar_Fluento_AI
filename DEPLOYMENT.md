# 🚀 Deployment Guide for Fluento AI

## Step 1: GitHub Repository Setup

### 1.1 Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository: `fluento-ai-spanish-platform`
5. Set it to "Public" (or Private if you prefer)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 1.2 Push Code to GitHub
```bash
# Your code is already committed locally
# Add the GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/fluento-ai-spanish-platform.git

# Push your code
git branch -M main
git push -u origin main
```

## Step 2: Vercel Deployment

### 2.1 Connect Vercel to GitHub
1. Go to [Vercel.com](https://vercel.com)
2. Sign up/in with your GitHub account
3. Click "New Project"
4. Import your `fluento-ai-spanish-platform` repository
5. Click "Import"

### 2.2 Configure Build Settings
Vercel should auto-detect Next.js, but ensure these settings:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (already configured in package.json)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install --legacy-peer-deps`

### 2.3 Environment Variables Setup
In Vercel dashboard, add these environment variables:

**Required Variables:**
```env
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-at-least-32-chars-long
DATABASE_URL=postgresql://username:password@host:port/database
OPENAI_API_KEY=sk-your-openai-api-key-here
STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
STRIPE_MONTHLY_PRICE_ID=price_your-monthly-price-id
STRIPE_YEARLY_PRICE_ID=price_your-yearly-price-id
```

**Optional Variables:**
```env
EMAIL_FROM=noreply@yourdomain.com
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email
EMAIL_PASSWORD=your-password
AZURE_SPEECH_KEY=your-azure-key
AZURE_SPEECH_REGION=your-region
APP_NAME=Fluento AI
```

## Step 3: Database Setup (Production)

### 3.1 PostgreSQL Database (Recommended for Production)

**Option A: Vercel Postgres**
1. In Vercel dashboard, go to Storage tab
2. Create a new Postgres database
3. Copy the connection string to `DATABASE_URL`

**Option B: External PostgreSQL (Railway, Supabase, etc.)**
1. Create a PostgreSQL database on your preferred provider
2. Get the connection string
3. Add to `DATABASE_URL` environment variable

### 3.2 Update Prisma Schema for PostgreSQL
```prisma
// In prisma/schema.prisma, change the datasource:
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

### 3.3 Run Database Migration
```bash
# After deploying, run this in Vercel Functions or locally:
npx prisma migrate deploy
```

## Step 4: External Service Configuration

### 4.1 OpenAI API Setup
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create an API key
3. Add to `OPENAI_API_KEY` environment variable
4. Ensure you have credits/billing set up

### 4.2 Stripe Setup
1. Create a [Stripe](https://stripe.com) account
2. Go to Developers → API Keys
3. Get your publishable and secret keys (use live keys for production)
4. Create products:
   - Monthly Plan ($9.99/month)
   - Yearly Plan ($99.99/year)
5. Get the price IDs for each product
6. Set up webhook endpoint: `https://your-app.vercel.app/api/webhooks/stripe`
7. Configure webhook events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

## Step 5: DNS and Domain (Optional)

### 5.1 Custom Domain
1. In Vercel dashboard, go to Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` and `APP_URL` environment variables

## Step 6: Post-Deployment Checklist

### 6.1 Test Core Features
- [ ] User registration and login
- [ ] AI chat functionality
- [ ] Speech recognition and synthesis
- [ ] Stripe payments (test mode first)
- [ ] Admin dashboard access
- [ ] Lesson management

### 6.2 Security Checklist
- [ ] Environment variables are properly set
- [ ] Database is secured
- [ ] Stripe webhooks are verified
- [ ] HTTPS is enabled (automatic with Vercel)

### 6.3 Performance Optimization
- [ ] Enable Vercel Analytics
- [ ] Set up monitoring for API routes
- [ ] Configure caching for static assets

## Step 7: Continuous Deployment

### 7.1 Automatic Deployments
- Every push to `main` branch will trigger automatic deployment
- Preview deployments for pull requests
- Branch deployments for feature testing

### 7.2 Database Migrations
For future database changes:
```bash
# 1. Create migration locally
npx prisma migrate dev --name your_migration_name

# 2. Push code to GitHub
git add . && git commit -m "Add migration" && git push

# 3. Deploy migration in production
npx prisma migrate deploy
```

## 🎉 Your Fluento AI Platform is Now Live!

Your Spanish learning platform is now deployed and accessible to users worldwide. The platform includes:

- ✅ AI-powered Spanish tutoring
- ✅ Voice recognition and synthesis
- ✅ Subscription management
- ✅ Admin dashboard
- ✅ Lesson management
- ✅ Progressive web app capabilities
- ✅ Mobile-responsive design

**Next Steps:**
1. Share your platform with beta users
2. Monitor performance and usage
3. Iterate based on user feedback
4. Scale as needed with Vercel Pro features

**Support:** If you encounter any issues during deployment, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Prisma Production Guide](https://www.prisma.io/docs/guides/deployment)