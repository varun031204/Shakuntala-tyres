# Free Deployment Guide - Shakuntala Tyres

## 🚀 Frontend Deployment (Vercel - Recommended)

### Option 1: Vercel (Easiest)
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/shakuntala-tyres.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy automatically

3. **Live URL**: `https://shakuntala-tyres.vercel.app`

### Option 2: Netlify
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `build` folder
   - Get instant live URL

## 🗄️ Backend Deployment (Railway)

### Option 1: Railway (Free Tier)
1. **Push backend to GitHub**:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Backend deployment"
   git push
   ```

2. **Deploy on Railway**:
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Add MongoDB database
   - Deploy automatically

3. **Update frontend API URLs**:
   ```typescript
   // Replace localhost URLs with Railway URL
   const API_URL = 'https://your-app.railway.app/api'
   ```

### Option 2: Render (Alternative)
1. **Deploy on Render**:
   - Go to [render.com](https://render.com)
   - Connect repository
   - Add environment variables
   - Deploy

## 📱 Quick Demo Deployment (Frontend Only)

### Fastest Option - Vercel CLI:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy instantly
vercel --prod
```

### Environment Variables:
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 🔗 Demo URLs Structure:
- **Frontend**: `https://shakuntala-tyres.vercel.app`
- **Backend**: `https://shakuntala-tyres-api.railway.app`
- **Admin Panel**: `https://shakuntala-tyres.vercel.app/admin`

## ⚡ 5-Minute Demo Setup:

1. **Deploy Frontend** (2 minutes):
   ```bash
   vercel --prod
   ```

2. **Share URL** with client immediately
3. **Backend optional** for full functionality

## 📋 Pre-Deployment Checklist:
- [ ] Remove console.logs
- [ ] Update API URLs
- [ ] Test responsive design
- [ ] Verify all images load
- [ ] Check admin panel access

## 🎯 Client Demo Features:
✅ **Working Features** (Frontend Only):
- Responsive design
- All pages navigation
- Product display (fallback data)
- Contact forms
- Mobile optimization

⚠️ **Requires Backend**:
- Admin panel functionality
- Real product management
- Image uploads
- Database operations

**Recommendation**: Deploy frontend first for visual demo, add backend later for full functionality.