# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a cloud MongoDB database
3. **Git Repository**: Push your code to GitHub/GitLab/Bitbucket

## Environment Variables Setup

### 1. MongoDB Connection

Create a `.env.local` file in your project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/briggs-fashion?retryWrites=true&w=majority

# Next.js Public URL (for API calls)
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Admin Credentials (optional - for basic auth)
ADMIN_EMAIL=admin@briggsfashion.com
ADMIN_PASSWORD=secure-admin-password
```

### 2. Vercel Environment Variables

In your Vercel dashboard, add these environment variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/briggs-fashion?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-key-here
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
ADMIN_EMAIL=admin@briggsfashion.com
ADMIN_PASSWORD=secure-admin-password
```

## Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Select the repository containing your project

### 2. Configure Project Settings

**Framework Preset**: Next.js
**Root Directory**: `./` (default)
**Build Command**: `npm run build`
**Output Directory**: `.next`
**Install Command**: `npm install`

### 3. Environment Variables

Add all environment variables in the Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add each variable from the list above
3. Set environment to "Production" and "Preview"

### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your site will be live at `https://your-project.vercel.app`

## Post-Deployment Setup

### 1. Seed Database

After deployment, seed your database with initial data:

```bash
# Option 1: Run locally with production DB
npm run seed

# Option 2: Use Vercel CLI
vercel env pull .env.local
npm run seed
```

### 2. Verify Deployment

1. **Homepage**: Check if the site loads correctly
2. **Products**: Verify product listing works
3. **Admin Panel**: Test admin functionality
4. **API Routes**: Ensure all API endpoints work

### 3. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed

## Troubleshooting

### Common Issues

#### 1. Build Failures

**Error**: TypeScript compilation errors
**Solution**:

```bash
npm run typecheck
npm run lint
```

#### 2. Database Connection Issues

**Error**: MongoDB connection timeout
**Solution**:

- Check `MONGODB_URI` format
- Ensure IP whitelist includes Vercel
- Verify network access settings

#### 3. Environment Variables

**Error**: Undefined environment variables
**Solution**:

- Verify all variables are set in Vercel dashboard
- Check variable names match exactly
- Ensure variables are set for all environments

#### 4. API Routes Not Working

**Error**: 500 errors on API calls
**Solution**:

- Check serverless function logs in Vercel
- Verify database connection
- Test API routes locally first

### Performance Optimization

#### 1. Image Optimization

- Use Next.js Image component
- Optimize image sizes
- Enable WebP/AVIF formats

#### 2. Caching

- Implement proper caching headers
- Use CDN for static assets
- Enable Vercel's edge caching

#### 3. Database Optimization

- Use connection pooling
- Implement proper indexing
- Monitor query performance

## Monitoring & Analytics

### 1. Vercel Analytics

Enable Vercel Analytics in project settings for:

- Page views
- Performance metrics
- User behavior

### 2. Error Tracking

Consider adding error tracking:

- Sentry
- LogRocket
- Vercel's built-in error tracking

## Security Checklist

- [ ] Environment variables are secure
- [ ] JWT secret is strong and unique
- [ ] MongoDB connection is secure
- [ ] Admin credentials are strong
- [ ] HTTPS is enforced
- [ ] Security headers are configured
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented

## Maintenance

### Regular Tasks

1. **Database Backups**: Set up automated MongoDB backups
2. **Security Updates**: Keep dependencies updated
3. **Performance Monitoring**: Monitor Core Web Vitals
4. **Content Updates**: Use admin panel for content management

### Updates

To update your deployment:

1. Push changes to your Git repository
2. Vercel will automatically redeploy
3. Monitor deployment logs for any issues
4. Test functionality after deployment

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

---

**Note**: This deployment guide assumes you have a MongoDB Atlas database set up. If you need help setting up MongoDB Atlas, refer to their official documentation.
