# 🚀 Complete Deployment Guide - Cyclic + Vercel

## 📋 Prerequisites
- GitHub account
- Cyclic account (cyclic.sh)
- Vercel account (vercel.com)
- Domain: shakuntalatyres.shop

## 🔧 Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/shakuntala-tyres-react.git
git push -u origin main
```

## 🚀 Step 2: Deploy Backend to Cyclic

1. **Go to [cyclic.sh](https://cyclic.sh)**
2. **Sign in with GitHub**
3. **Click "Deploy"**
4. **Select your repository**
5. **Choose backend folder as root**
6. **Set environment variables:**

```
MONGODB_URI=mongodb+srv://varun43483_db_user:Varun%402004@shakuntala-tyres.ikgluog.mongodb.net/shakuntala-tyres?retryWrites=true&w=majority&appName=Shakuntala-tyres
JWT_SECRET=your-super-secret-jwt-key-here-production
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=dycqtmppg
CLOUDINARY_API_KEY=741648283361733
CLOUDINARY_API_SECRET=tOrqdtTfHH1BeGdyR-f5Ow_rPM4
```

7. **Deploy automatically**
8. **Note your Cyclic URL:** `https://your-app-name.cyclic.app`

## 🌐 Step 3: Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Follow prompts:
# - Link to existing project? No
# - Project name: shakuntala-tyres
# - Directory: ./
# - Override settings? No
```

## 🔗 Step 4: Configure Custom Domains

### In Vercel Dashboard:
1. **Go to your project settings**
2. **Add domains:**
   - `shakuntalatyres.shop`
   - `admin.shakuntalatyres.shop`

### In Your Domain Provider (DNS):
```
Type    Name    Value                    TTL
A       @       76.76.19.19             300
CNAME   www     cname.vercel-dns.com    300
CNAME   admin   cname.vercel-dns.com    300
```

## 🔧 Step 5: Update Environment Variables

### Update Vercel Environment Variables:
1. **Go to Vercel project settings**
2. **Environment Variables section**
3. **Add:**
```
REACT_APP_API_URL = https://your-cyclic-app.cyclic.app/api
```

## ✅ Step 6: Test Deployment

1. **Backend Health Check:**
   - Visit: `https://your-cyclic-app.cyclic.app/health`
   - Should return: `{"status":"OK","timestamp":"..."}`

2. **Frontend:**
   - Visit: `https://shakuntalatyres.shop`
   - Should load main website

3. **Admin Panel:**
   - Visit: `https://admin.shakuntalatyres.shop/admin`
   - Should load admin dashboard

## 🎯 Final URLs:
- **Main Website:** https://shakuntalatyres.shop
- **Admin Panel:** https://admin.shakuntalatyres.shop/admin
- **API Backend:** https://your-cyclic-app.cyclic.app/api

## 🔄 Future Updates:
- **Backend:** Push to GitHub → Auto-deploys to Cyclic
- **Frontend:** Run `vercel --prod` → Deploys to Vercel

## 💡 Benefits of This Setup:
- ✅ **Always-on backend** (no sleeping)
- ✅ **Fast response times**
- ✅ **Free hosting**
- ✅ **Auto-deployments**
- ✅ **SSL certificates**
- ✅ **Custom domains**