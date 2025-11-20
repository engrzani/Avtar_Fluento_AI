#!/bin/bash

# Vercel build script for Fluento AI
echo "🚀 Starting Fluento AI build process..."

# Install dependencies with legacy peer deps
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!"