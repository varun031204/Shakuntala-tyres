#!/bin/bash

echo "🚀 Starting deployment process..."

# Build React app
echo "📦 Building React application..."
npm run build

# Create deployment package
echo "📁 Creating deployment package..."
mkdir -p deploy
cp -r build/* deploy/
cp -r backend deploy/
cp package.json deploy/

echo "✅ Deployment package ready in ./deploy folder"
echo "📤 Upload the deploy folder to your hosting provider"