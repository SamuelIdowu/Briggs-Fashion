# Deployment Guide - Briggs Fashion E-commerce

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (for production)
- Vercel account (recommended) or other hosting platform

## Environment Setup

1. Copy the environment example file:

   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your production values:
   - `MONGODB_URI_PROD`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key for JWT tokens
   - `NEXT_PUBLIC_GA_ID`: Your Google Analytics 4 ID
   - `CLOUDINARY_*`: Cloudinary credentials for image uploads
   - `NEXT_PUBLIC_SITE_URL`: Your production domain

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel:**

   ```bash
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard:**

   - Go to your project settings
   - Add all environment variables from `.env.local`

4. **Connect Custom Domain (Optional):**
   - Add your domain in Vercel dashboard
   - Update DNS records as instructed

### Option 2: Docker Deployment

1. **Build and run with Docker Compose:**

   ```bash
   docker-compose up --build
   ```

2. **For production with external MongoDB:**
   ```bash
   docker build -t briggs-fashion .
   docker run -p 3000:3000 --env-file .env.local briggs-fashion
   ```

### Option 3: Manual Server Deployment

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

## Database Setup

### MongoDB Atlas (Production)

1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Update `MONGODB_URI_PROD` in environment variables
4. The application will automatically create collections and indexes

### Local MongoDB (Development)

1. Install MongoDB locally or use Docker:

   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. Update `MONGODB_URI` in `.env.local`

## Initial Setup

After deployment, the application will automatically:

1. Create the admin user (if not exists)
2. Initialize site settings
3. Create necessary database indexes

### Admin Access

Default admin credentials (change in production):

- Email: `admin@briggsfashion.com`
- Password: `admin123`

**Important:** Change these credentials immediately after first login.

## Performance Optimization

### Image Optimization

1. Set up Cloudinary for image storage
2. Configure image transformations
3. Use Next.js Image component for optimization

### Caching

1. Enable Vercel Edge Caching
2. Configure CDN for static assets
3. Implement Redis for session storage (optional)

## Monitoring & Analytics

1. **Google Analytics 4:**

   - Set up GA4 property
   - Add tracking ID to environment variables

2. **Error Monitoring:**

   - Consider adding Sentry for error tracking
   - Monitor Vercel function logs

3. **Performance Monitoring:**
   - Use Vercel Analytics
   - Monitor Core Web Vitals

## Security Checklist

- [ ] Change default admin credentials
- [ ] Use strong JWT secret
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up proper CORS headers
- [ ] Configure rate limiting
- [ ] Regular security updates

## Backup Strategy

1. **Database Backups:**

   - MongoDB Atlas provides automatic backups
   - Set up manual backup schedule

2. **Code Backups:**
   - Use Git for version control
   - Regular commits and pushes

## Maintenance

1. **Regular Updates:**

   - Keep dependencies updated
   - Monitor for security vulnerabilities

2. **Performance Audits:**

   - Monthly Lighthouse audits
   - Monitor Core Web Vitals

3. **Content Updates:**
   - Use admin panel for content management
   - Regular product updates

## Troubleshooting

### Common Issues

1. **Database Connection:**

   - Check MongoDB URI format
   - Verify network access

2. **Build Errors:**

   - Check Node.js version compatibility
   - Verify all dependencies installed

3. **Environment Variables:**
   - Ensure all required variables are set
   - Check for typos in variable names

### Support

For deployment issues, check:

- Vercel documentation
- Next.js deployment guide
- MongoDB Atlas documentation
