#!/bin/bash

# machinaRL Setup Script
# This script sets up the development environment for machinaRL

set -e

echo "🧠 Setting up machinaRL development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if pnpm is installed, install if not
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "✅ pnpm $(pnpm -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Copy environment file
if [ ! -f ".env.local" ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
else
    echo "✅ .env.local already exists"
fi

# Create data directories
echo "📁 Creating data directories..."
mkdir -p data/results
mkdir -p public/unity
mkdir -p docs/diagrams

echo "✅ Data directories created"

# Run seed script
echo "🌱 Seeding demo data..."
if [ -f "scripts/seed_demo.sh" ]; then
    chmod +x scripts/seed_demo.sh
    ./scripts/seed_demo.sh
else
    echo "⚠️  Seed script not found, skipping..."
fi

# Run type check
echo "🔍 Running type check..."
pnpm type-check

# Run linter
echo "🧹 Running linter..."
pnpm lint

echo ""
echo "🎉 Setup complete! You can now start developing:"
echo ""
echo "  pnpm dev          # Start development server"
echo "  pnpm build        # Build for production"
echo "  pnpm test         # Run tests"
echo "  pnpm lint         # Run linter"
echo ""
echo "Visit http://localhost:3000 to see the application"
echo ""
