# 🚀 Deployment Guide - Instagram Clone

## Production Deployment Checklist

### Pre-Deployment Checklist
- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Database backup created
- [ ] SSL certificates ready
- [ ] Domain name configured
- [ ] CDN setup (optional)

---

## Backend Deployment

### Option 1: Deploy to Heroku

#### 1. Prepare Backend
```bash
cd Backend

# Create Procfile
echo "web: node server.js" > Procfile

# Ensure package.json has start script
# "start": "node server.js"
```

#### 2. Deploy to Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-instagram-backend

# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set JWT_SECRET_KEY="your_jwt_secret"
heroku config:set CLOUDINARY_CLOUD_NAME="your_cloud_name"
heroku config:set CLOUDINARY_API_KEY="your_api_key"
heroku config:set CLOUDINARY_API_SECRET="your_api_secret"
heroku config:set EMAIL_USER="your_email"
heroku config:set EMAIL_PASS="your_email_password"
heroku config:set BASE_URL="https://your-instagram-backend.herokuapp.com"

# Deploy
git push heroku main

# Open app
heroku open
```

### Option 2: Deploy to Railway

#### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

#### 2. Deploy
```bash
cd Backend

# Login
railway login

# Initialize project
railway init

# Add environment variables in Railway dashboard

# Deploy
railway up
```

### Option 3: Deploy to Render

#### 1. Create render.yaml
```yaml
services:
  - type: web
    name: instagram-backend
    env: node
    buildCommand: npm install
    startCommand: node server.js
    envVars:
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET_KEY
        sync: false
      - key: CLOUDINARY_CLOUD_NAME
        sync: false
      - key: CLOUDINARY_API_KEY
        sync: false
      - key: CLOUDINARY_API_SECRET
        sync: false
```

#### 2. Deploy
1. Push code to GitHub
2. Connect repository to Render
3. Add environment variables
4. Deploy

### Option 4: Deploy to VPS (DigitalOcean, AWS EC2, etc.)

#### 1. Setup Server
```bash
# SSH into server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
apt install -y nginx
```

#### 2. Deploy Application
```bash
# Clone repository
git clone your-repo-url
cd Backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add all environment variables

# Start with PM2
pm2 start server.js --name instagram-backend
pm2 save
pm2 startup
```

#### 3. Configure Nginx
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 4. Setup SSL with Let's Encrypt
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d api.yourdomain.com
```

---

## Frontend Deployment

### Option 1: Deploy to Vercel (Recommended)

#### 1. Prepare Frontend
```bash
cd Frontend

# Update API base URL in src/services/api.js
# Change to your production backend URL
baseURL: "https://your-backend-url.com"
```

#### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

#### 3. Configure Environment Variables (if needed)
```bash
# In Vercel dashboard, add environment variables
VITE_API_URL=https://your-backend-url.com
```

### Option 2: Deploy to Netlify

#### 1. Build Application
```bash
cd Frontend
npm run build
```

#### 2. Create netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 3. Deploy
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Option 3: Deploy to GitHub Pages

#### 1. Update vite.config.js
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
  // ... rest of config
})
```

#### 2. Add deployment script to package.json
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### 3. Deploy
```bash
npm install -g gh-pages
npm run deploy
```

### Option 4: Deploy to AWS S3 + CloudFront

#### 1. Build Application
```bash
npm run build
```

#### 2. Create S3 Bucket
```bash
aws s3 mb s3://your-instagram-frontend
aws s3 website s3://your-instagram-frontend --index-document index.html
```

#### 3. Upload Files
```bash
aws s3 sync dist/ s3://your-instagram-frontend
```

#### 4. Setup CloudFront
- Create CloudFront distribution
- Point to S3 bucket
- Configure custom domain
- Setup SSL certificate

---

## Database Deployment

### MongoDB Atlas (Recommended)

#### 1. Create Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)

#### 2. Get Connection String
```
mongodb+srv://username:password@cluster.mongodb.net/instagram?retryWrites=true&w=majority
```

#### 3. Update Backend .env
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/instagram
```

---

## Environment Variables

### Backend Production .env
```env
# Server
PORT=3000
NODE_ENV=production

# Database
MONGODB_URI=your_production_mongodb_uri

# JWT
JWT_SECRET_KEY=your_very_secure_jwt_secret_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Base URL
BASE_URL=https://your-backend-domain.com
```

### Frontend Production
Update `Frontend/src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: process.env.VITE_API_URL || "https://your-backend-url.com",
  // ... rest of config
});
```

---

## Post-Deployment

### 1. Update CORS in Backend
```javascript
app.use(cors({
  origin: [
    "https://your-frontend-domain.com",
    "http://localhost:5173" // Keep for local development
  ],
  credentials: true
}));
```

### 2. Test Production
- [ ] Test registration
- [ ] Test login
- [ ] Test post creation
- [ ] Test image uploads
- [ ] Test all features
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificates
- [ ] Test email functionality

### 3. Setup Monitoring

#### Backend Monitoring
```bash
# PM2 monitoring
pm2 monit

# Setup PM2 web dashboard
pm2 web
```

#### Error Tracking
- Setup Sentry for error tracking
- Configure logging service
- Setup uptime monitoring

### 4. Performance Optimization

#### Backend
- Enable gzip compression
- Setup Redis caching
- Optimize database queries
- Setup CDN for images

#### Frontend
- Enable code splitting
- Optimize images
- Setup service worker
- Enable caching

---

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "your-instagram-backend"
          heroku_email: "your-email@example.com"
          appdir: "Backend"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          working-directory: ./Frontend
```

---

## Security Checklist

### Backend Security
- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation enabled
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] CSRF protection enabled
- [ ] Helmet.js configured
- [ ] Dependencies updated

### Frontend Security
- [ ] API keys not exposed
- [ ] HTTPS enforced
- [ ] Content Security Policy set
- [ ] XSS protection enabled
- [ ] Dependencies updated

---

## Backup Strategy

### Database Backup
```bash
# MongoDB Atlas automatic backups
# Or manual backup:
mongodump --uri="mongodb+srv://..." --out=/backup/$(date +%Y%m%d)
```

### Code Backup
- Use Git for version control
- Push to GitHub/GitLab
- Tag releases

---

## Rollback Plan

### Backend Rollback
```bash
# Heroku
heroku rollback

# PM2
pm2 restart instagram-backend
```

### Frontend Rollback
```bash
# Vercel
vercel rollback

# Netlify
netlify rollback
```

---

## Monitoring & Maintenance

### Daily Checks
- [ ] Check error logs
- [ ] Monitor server resources
- [ ] Check uptime status
- [ ] Review user feedback

### Weekly Checks
- [ ] Review analytics
- [ ] Check database size
- [ ] Update dependencies
- [ ] Review security alerts

### Monthly Checks
- [ ] Database optimization
- [ ] Performance audit
- [ ] Security audit
- [ ] Backup verification

---

## Cost Estimation

### Free Tier Options
- **Backend**: Heroku/Railway/Render free tier
- **Frontend**: Vercel/Netlify free tier
- **Database**: MongoDB Atlas free tier (512MB)
- **Images**: Cloudinary free tier (25GB)
- **Total**: $0/month

### Paid Options
- **Backend**: $7-25/month (Heroku Hobby/Railway Pro)
- **Frontend**: $0-20/month (Vercel Pro)
- **Database**: $9-57/month (MongoDB Atlas M10-M30)
- **Images**: $0-99/month (Cloudinary Plus)
- **Total**: $16-200/month

---

## Support & Troubleshooting

### Common Deployment Issues

#### Issue: CORS errors in production
**Solution**: Update CORS origin to include production frontend URL

#### Issue: Images not uploading
**Solution**: Check Cloudinary credentials and upload limits

#### Issue: Database connection failed
**Solution**: Verify MongoDB URI and whitelist IP addresses

#### Issue: 404 on page refresh
**Solution**: Configure server to serve index.html for all routes

---

## Success Metrics

### Track These Metrics
- User registrations
- Daily active users
- Posts created
- Engagement rate (likes, comments)
- Page load times
- Error rates
- Server uptime

---

**Deployment Complete! 🎉**

Your Instagram clone is now live and ready for users!
