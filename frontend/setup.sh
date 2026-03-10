#!/bin/bash

# Frontend Quick Setup Script
echo "🚀 CRM Frontend Setup"
echo "====================="
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✓ Node.js $(node --version) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo ""
echo "✓ Dependencies installed successfully!"
echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Create .env file: cp .env.example .env"
echo "  2. Start dev server: npm run dev"
echo "  3. Open http://localhost:5173"
echo ""
