@echo off
echo 📦 Pushing Shakuntala Tyres to GitHub...

echo.
echo 🔧 Initializing git repository...
git init

echo.
echo 📁 Adding all files...
git add .

echo.
echo 💾 Creating initial commit...
git commit -m "Initial commit - Shakuntala Tyres React App with Backend"

echo.
echo 🌐 Ready to push to GitHub!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub named: shakuntala-tyres-react
echo 2. Copy the repository URL
echo 3. Run these commands:
echo.
echo git remote add origin https://github.com/yourusername/shakuntala-tyres-react.git
echo git branch -M main
echo git push -u origin main
echo.
pause