@echo off
echo 🚀 Quick Deploy Script for Shakuntala Tyres

echo.
echo 📦 Building React app...
npm run build

echo.
echo 🌐 Deploying to Vercel...
vercel --prod

echo.
echo ✅ Deployment complete!
echo.
echo 🔗 Your sites:
echo Main: https://shakuntalatyres.shop
echo Admin: https://admin.shakuntalatyres.shop/admin
echo.
pause