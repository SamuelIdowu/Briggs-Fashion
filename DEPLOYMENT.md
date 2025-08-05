# 🚀 Vercel Deployment Fix Guide

## **Current Issue: Deployment Failures**

Your Vercel deployments are failing due to missing environment variables and configuration issues.

## **🔧 Immediate Fixes Required**

### **1. Set Environment Variables in Vercel**

Go to your Vercel project dashboard → Settings → Environment Variables and add:

```bash
# Required for production
MONGODB_URI_PROD=mongodb+srv://briggs:briggsfashion@briggs.nho4bht.mongodb.net/?retryWrites=true&w=majority&appName=Briggs
JWT_SECRET=655b67721b98a871b0a0dc02bae3f7ef509d05dae783b3d18323a098521c15cd0b12d49716237873150eebc9426868333a55dea5c8e12364413317ae6af8824d
JWT_EXPIRES_IN=24h
ADMIN_EMAIL=admin@briggsfashion.com
ADMIN_PASSWORD=admin123

# Optional (for better performance)
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-vercel-domain.vercel.app/api
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

### **2. Environment Variable Setup Steps**

1. **Go to Vercel Dashboard**

   - Navigate to your project
   - Click "Settings" tab
   - Click "Environment Variables"

2. **Add Each Variable**

   - Click "Add New"
   - Set **Production** environment
   - Add each variable from the list above

3. **Redeploy**
   - Go to "Deployments" tab
   - Click "Redeploy" on the latest deployment

## **🔍 Common Deployment Error Causes**

### **1. Missing Environment Variables** ❌

- **Error**: "MONGODB_URI_PROD is not defined"
- **Fix**: Add all required env vars to Vercel

### **2. MongoDB Connection Timeout** ⏱️

- **Error**: "MongoDB connection failed"
- **Fix**: Updated connection timeout settings

### **3. Build Timeout** 🚫

- **Error**: "Function execution timeout"
- **Fix**: Increased maxDuration to 60 seconds

### **4. Node.js Version Issues** 🔧

- **Error**: "Module not found" or build failures
- **Fix**: Added `.nvmrc` file with Node 18

## **✅ Verification Steps**

### **1. Check Environment Variables**

```bash
# In Vercel Functions, these should be available:
console.log('MONGODB_URI_PROD:', process.env.MONGODB_URI_PROD);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'MISSING');
```

### **2. Test Database Connection**

```bash
# Add this to any API route temporarily:
import dbConnect from '@/lib/database';

export async function GET() {
  try {
    await dbConnect();
    return Response.json({ status: 'Database connected' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

### **3. Check Build Logs**

- Go to Vercel deployment logs
- Look for specific error messages
- Check if all environment variables are loaded

## **🚀 Deployment Checklist**

- [ ] Environment variables set in Vercel
- [ ] MongoDB URI is valid and accessible
- [ ] JWT_SECRET is properly configured
- [ ] Node.js version is set to 18
- [ ] Build timeout increased to 60 seconds
- [ ] Database connection handles errors gracefully

## **🔧 Troubleshooting**

### **If Deployment Still Fails:**

1. **Check Vercel Logs**

   - Go to deployment → "Functions" tab
   - Look for specific error messages

2. **Test Environment Variables**

   - Add a test API route to verify env vars
   - Check if MongoDB connection works

3. **Verify MongoDB Access**

   - Test MongoDB URI in MongoDB Atlas
   - Ensure IP whitelist includes Vercel

4. **Check Build Output**
   - Look for TypeScript errors
   - Verify all dependencies are installed

## **📞 Support**

If issues persist:

1. Check Vercel deployment logs
2. Verify MongoDB Atlas configuration
3. Test environment variables locally
4. Contact Vercel support if needed

---

**Status**: ✅ **Ready for deployment after environment variables are set**
