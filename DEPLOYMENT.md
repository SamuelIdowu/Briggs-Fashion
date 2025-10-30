# 🚀 Vercel Deployment Guide for Briggs Fashion

## **Overview**

This guide provides comprehensive instructions for deploying the Briggs Fashion Next.js application to Vercel, a leading platform for static and serverless deployment.

## **Prerequisites**

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository for your project
- Node.js 18+ (configured in `.nvmrc`)
- MongoDB Atlas account for database

## **Environment Variables Setup**

Set these environment variables in your Vercel project dashboard:

### **Production Environment Variables**
```bash
# Database Configuration
MONGODB_URI_PROD=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority&appName=<appName>

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here-at-least-32-characters-long
JWT_EXPIRES_IN=24h

# Admin Credentials (for protected admin routes)
ADMIN_EMAIL=your-admin-email@domain.com
ADMIN_PASSWORD=your-secure-admin-password

# Application Environment
NODE_ENV=production

# Optional: Public URLs
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_API_URL=https://your-project.vercel.app/api
```

### **How to Set Environment Variables in Vercel**

1. **Access Your Project Dashboard**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your Briggs Fashion project

2. **Navigate to Environment Variables**
   - Click on "Settings" tab
   - Go to "Environment Variables" section

3. **Add Each Variable**
   - For each variable above, add:
     - Key: Variable name (e.g., `MONGODB_URI_PROD`)
     - Value: Variable value
     - Target: Select "Production" (and optionally "Preview" for development features)

## **Vercel Configuration (`vercel.json`)**

Ensure your `vercel.json` is properly configured for optimal performance:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci",
  "framework": "nextjs",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 60
    }
  },
  "env": {
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  }
}
```

### **Configuration Explained**
- `maxDuration: 60` - Allows API routes to run up to 60 seconds (important for database operations)
- `npm ci` - Ensures clean, reproducible builds
- `outputDirectory: ".next"` - Specifies Next.js build output

## **Next.js Configuration (`next.config.ts`)**

Your `next.config.ts` is already optimized for Vercel deployment with image optimization and security headers:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Production optimizations
  // Output standalone is commented out but available if needed
  
  // TypeScript and ESLint
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Vercel specific optimizations
  poweredByHeader: false,
  
  // Image optimization for multiple providers
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};
```

## **Deployment Process**

### **Method 1: Git Integration (Recommended)**
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in your Vercel dashboard
3. Vercel will automatically detect it's a Next.js project
4. Add environment variables as specified above
5. Click "Deploy"

### **Method 2: Vercel CLI**
```bash
# Install Vercel CLI globally
npm i -g vercel

# Link your project to Vercel
vercel link

# Set environment variables
vercel env add MONGODB_URI_PROD
vercel env add JWT_SECRET
vercel env add JWT_EXPIRES_IN
vercel env add ADMIN_EMAIL
vercel env add ADMIN_PASSWORD
vercel env add NODE_ENV

# Deploy to production
vercel --prod
```

## **Optimization Best Practices**

### **Performance Optimizations**
- **Image Optimization**: Configured for multiple image providers
- **CSS Optimization**: Enabled in `next.config.ts`
- **Package Optimization**: Import optimization for UI libraries
- **Compression**: Enabled by default on Vercel

### **Database Connection Optimization**
- Connection caching implemented to avoid multiple connections
- Retry logic with exponential backoff
- Proper timeout configurations

### **Security Considerations**
- Security headers configured in `next.config.ts`
- Environment variables for sensitive data
- Sanitized input in API routes

## **Troubleshooting Common Issues**

### **1. Database Connection Timeout**
- **Symptom**: `MongoDB connection failed` in logs
- **Solution**: 
  - Ensure your MongoDB Atlas cluster allows connections from Vercel IPs
  - Check your connection string format
  - Verify all database user credentials

### **2. Build Failures**
- **Symptom**: Build process fails in Vercel logs
- **Solution**:
  - Ensure all dependencies are in `package.json`
  - Check that `buildCommand` is set to `npm run build`
  - Verify Node.js version compatibility (18.x recommended)
  - Run `npm run typecheck` locally to catch TypeScript errors before deploying
  - Run `npm run lint` to catch potential issues

### **3. Environment Variables Missing**
- **Symptom**: `MONGODB_URI_PROD is not defined`
- **Solution**: Double-check environment variables are set in Vercel dashboard
  - Ensure they're targeting "Production" environment

### **4. API Route Timeouts**
- **Symptom**: API routes fail with timeout errors
- **Solution**: 
  - Increase `maxDuration` in `vercel.json` if needed
  - Optimize database queries
  - Implement proper error handling

### **5. Build-Specific Issues**

#### **Client-Side Code in Server Components**
- **Issue**: Using browser APIs like `window`, `document`, `localStorage` in server components
- **Solution**: We've properly implemented `'use client'` directives in component files that need browser APIs
- **Example**: `ProductModal.tsx` has `'use client'` at the top since it uses browser APIs

#### **Console Logs in Production**
- **Issue**: Debug console logs in production builds
- **Solution**: The Vercel build process will automatically remove development console logs
- **Note**: We've identified that your `database.ts` file has debugging console logs that should be removed for production

#### **Node.js Compatibility**
- **Issue**: Using Node.js-specific APIs that may not be available during build
- **Solution**: Your application correctly uses Next.js compatible patterns
- **Note**: The `dbConnect` function in `database.ts` uses Node.js APIs which are only called in server components/api routes

## **Build Optimization and Best Practices**

### **Pre-Build Checks**
Run these commands locally before deploying to catch issues early:

```bash
# Check for TypeScript errors
npm run typecheck

# Run linter
npm run lint

# Test the build process locally
npm run build

# Test production server locally
npm run start
```

### **Optimizing Database Connections**
Your current implementation in `src/lib/database.ts` already includes:
- Connection caching to prevent exponential connections during hot reloads
- Retry logic with exponential backoff
- Proper error handling

### **Handling Environment Variables in Different Environments**
Your application correctly handles environment variables:
- Uses `process.env.MONGODB_URI_PROD || process.env.MONGODB_URI` with fallback
- Graceful handling when variables are missing in production
- Proper error messages during development

### **Image Optimization**
Your Next.js configuration in `next.config.ts` already includes:
- `remotePatterns` for external image domains (placehold.co, cloudinary, unsplash)
- Support for modern formats (webp, avif)
- Proper security headers

### **Serverless Function Optimization**
Your API routes are optimized with:
- Proper async/await patterns
- Error boundaries
- Efficient database connection management
- Input validation

## **Post-Deployment Checklist**

- [ ] Application successfully deploys to Vercel
- [ ] Environment variables are correctly set
- [ ] Database connection works in production
- [ ] Images load properly from configured domains
- [ ] API routes return correct data
- [ ] All pages render without errors
- [ ] Admin functionality works with proper credentials
- [ ] SSL certificate is active (https://)
- [ ] Custom domain (if applicable) is properly configured

## **Performance Monitoring**

After deployment, monitor your application using:
- Vercel Analytics for performance insights
- MongoDB Atlas for database performance
- Browser DevTools for client-side performance

## **Scaling Considerations**

- Vercel automatically scales serverless functions
- Plan your MongoDB Atlas tier based on expected traffic
- Consider using Redis for caching if needed in the future

## **Rollback Procedure**

If issues occur after deployment:
1. Go to your Vercel dashboard
2. Navigate to the "Deployments" tab
3. Find the previous stable deployment
4. Click "Promote" to restore that version

## **Support Resources**

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Help Center](https://vercel.com/help)

---

**Note**: This application is optimized for Vercel deployment and uses Next.js 15 with App Router, TypeScript, and MongoDB. The configuration ensures optimal performance, security, and scalability.