# 🚀 Deployment Commands

## 1. Backend Deployment (Railway)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Navigate to backend folder
cd backend

# Initialize Railway project
railway new

# Deploy backend
railway up

# Set environment variables in Railway dashboard:
# MONGODB_URI=mongodb+srv://varun43483_db_user:Varun%402004@shakuntala-tyres.ikgluog.mongodb.net/shakuntala-tyres?retryWrites=true&w=majority&appName=Shakuntala-tyres
# JWT_SECRET=your-super-secret-jwt-key-here-production
# NODE_ENV=production
# CLOUDINARY_CLOUD_NAME=dycqtmppg
# CLOUDINARY_API_KEY=741648283361733
# CLOUDINARY_API_SECRET=tOrqdtTfHH1BeGdyR-f5Ow_rPM4
```

## 2. Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project root
cd ..

# Deploy to Vercel
vercel --prod

# Set custom domains in Vercel dashboard:
# Main: shakuntalatyres.shop
# Admin: admin.shakuntalatyres.shop
```

## 3. DNS Configuration

Add these DNS records to your domain provider:

```
Type    Name    Value                                   TTL
A       @       76.76.19.19 (Vercel IP)               300
CNAME   www     cname.vercel-dns.com                   300
CNAME   admin   cname.vercel-dns.com                   300
```

## 4. Environment Variables Setup

### Railway (Backend):
- MONGODB_URI
- JWT_SECRET  
- NODE_ENV=production
- CLOUDINARY_* variables

### Vercel (Frontend):
- REACT_APP_API_URL=https://your-railway-app.up.railway.app/api

## 5. Post-Deployment Steps

1. Test API health: https://your-railway-app.up.railway.app/health
2. Test main site: https://shakuntalatyres.shop
3. Test admin: https://admin.shakuntalatyres.shop
4. Verify MongoDB connection in Railway logs