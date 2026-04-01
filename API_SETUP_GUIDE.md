# FitMutant API Environment Setup Guide

## 📋 Overview

This guide explains how to set up FitMutant for both **Local Development** and **Production (Vercel)** deployment.

---

## 🚀 Local Development Setup

### 1. Frontend (.env.local)

```bash
# client/.env.local
VITE_API_URL=http://localhost:5000
VITE_ENV=development
```

**How it works:**
- Vite proxy routes `/api/*` requests to `http://localhost:5000`
- Development server runs on `http://localhost:5173`
- API calls in code: `api.get('/packages')` → proxied to `localhost:5000/api/packages`

### 2. Backend (.env)

```bash
# server/.env
PORT=5000
HOST=0.0.0.0
NODE_ENV=development
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
ADMIN_PASSWORD=arda123
CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
FRONTEND_URL=http://localhost:5173
```

### 3. Start Local Development

```bash
# Terminal 1: Backend
cd server
npm run dev
# Server runs on http://localhost:5000

# Terminal 2: Frontend
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

### 4. Test API Calls

```javascript
// ✅ These work in development
import api from '@/services/api'

// Method 1: Using proxy
const packages = await api.get('/packages')

// Method 2: Using fetch
const response = await fetch('/api/packages')
const data = await response.json()

// Method 3: Direct URL (not recommended in dev)
const fullUrl = import.meta.env.VITE_API_URL
const data = await fetch(`${fullUrl}/api/packages`)
```

---

## 🌐 Production Setup (Vercel + Render)

### 1. Frontend - Vercel (.env.production)

```bash
# client/.env.production
VITE_API_URL=https://fitmutant.onrender.com
VITE_ENV=production
```

**Environment Variables on Vercel Dashboard:**
- Go to Settings → Environment Variables
- Add:
  - `VITE_API_URL=https://fitmutant.onrender.com`
  - `VITE_ENV=production`

### 2. Backend - Render Server (.env)

```bash
# server/.env (on Render)
PORT=5000
NODE_ENV=production
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
ADMIN_PASSWORD=arda123
CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
FRONTEND_URL=https://fitmutant.vercel.app
```

### 3. CORS Configuration

The backend automatically handles CORS for these origins:
```javascript
[
  "http://localhost:5173",      // Local dev
  "http://127.0.0.1:5173",
  "http://localhost:5000",      // Local backend
  "http://127.0.0.1:5000",
  "https://fitmutant.vercel.app", // Vercel production
]
```

---

## 🔄 How API Routing Works

### Development Flow
```
Client (localhost:5173)
    ↓
Vite Proxy (/api → localhost:5000)
    ↓
Backend (localhost:5000)
```

### Production Flow
```
Client (vercel.app)
    ↓
Direct HTTPS to Render
    ↓
Backend (onrender.com)
```

### Smart URL Selection (api.js)
```javascript
const isDevelopment = import.meta.env.MODE === "development"

// Development: Use proxy
// const API_BASE_URL = "/api"

// Production: Use full URL
// const API_BASE_URL = "https://fitmutant.onrender.com"
```

---

## 📝 Code Examples

### Basic API Call
```javascript
import api from '@/services/api'

// Automatically handles dev/prod URLs
const fetchPackages = async () => {
  try {
    const data = await api.get('/packages')
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### With Authentication
```javascript
// Token automatically added via interceptor
const updatePackage = async (id, packageData) => {
  try {
    const response = await api.put(`/packages/${id}`, packageData)
    return response.data
  } catch (error) {
    if (error.response?.status === 401) {
      // Token expired
      sessionStorage.removeItem('adminToken')
    }
    throw error
  }
}
```

### Image Upload with Cloudinary
```javascript
import api from '@/services/api'

const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)
  
  try {
    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data // { url, publicId }
  } catch (error) {
    throw error
  }
}
```

---

## 🧪 Testing Different Environments

### Test Local Backend
```bash
curl http://localhost:5000/api/health
# Response: { "status": "ok", "message": "Fit Mutant API is running" }
```

### Test Local Frontend + Backend
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev

# Open http://localhost:5173 in browser
```

### Test Production Build Locally
```bash
cd client
npm run build
npm run preview
# Runs production build on http://localhost:4173
```

---

## 🚨 Troubleshooting

### CORS Error
- Check backend CORS configuration includes your frontend URL
- Check `.env` has correct `FRONTEND_URL`

### API 404 Not Found
- Verify backend is running on correct port
- Check endpoint path is correct
- Verify route files are imported in `server/index.js`

### Token Not Being Sent
- Check `sessionStorage.getItem('adminToken')` has value
- Verify token is set after login
- Check Authorization header in network tab

### Wrong Environment Variables
- Delete `.next`, `dist`, `node_modules`
- Clear browser cache
- Restart dev server
- Verify `.env.local` and `.env.production` are in correct folders

---

## 📦 Deployment Checklist

- [ ] Backend running on Render with all env vars
- [ ] Frontend building successfully
- [ ] VITE_API_URL set on Vercel dashboard
- [ ] CORS includes Vercel domain
- [ ] Database backups configured
- [ ] API health check passing
- [ ] Admin login working in production
- [ ] Image uploads working
- [ ] Monitor error logs after deployment

---

## 🔗 Useful Links

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Axios Documentation](https://axios-http.com/)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Render Deployment](https://render.com/docs)

