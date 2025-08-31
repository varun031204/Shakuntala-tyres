@echo off
echo 🔄 Updating Vercel Deployment...

echo.
echo 📦 Building latest changes...
npm run build

echo.
echo 🚀 Deploying to Vercel...
vercel --prod

echo.
echo ✅ Update complete!
echo 🔗 Check: https://shakuntalatyres.shop
pause