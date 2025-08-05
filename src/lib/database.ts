import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: any; promise: any } | undefined;
}

// Primary MongoDB URI with DNS fallback handling
const MONGODB_URI = process.env.MONGODB_URI_PROD || process.env.MONGODB_URI;
// Fallback URI using direct IP if DNS fails (you might need to update this)
const MONGODB_URI_FALLBACK = process.env.MONGODB_URI_FALLBACK;

if (!MONGODB_URI) {
  console.error('❌ MongoDB URI not found. Please set MONGODB_URI_PROD or MONGODB_URI environment variable');
  // Don't throw in production, let the app handle it gracefully
  if (process.env.NODE_ENV === 'development') {
    throw new Error('Please define the MONGODB_URI_PROD or MONGODB_URI environment variable inside .env.local');
  }
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(retryCount = 0) {
  if (!MONGODB_URI) {
    console.error('❌ MongoDB URI not configured');
    return null;
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = { 
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 45000, // Increased timeout for DNS resolution
      socketTimeoutMS: 60000,
      connectTimeoutMS: 45000, // Increased connection timeout
      family: 4, // Force IPv4 to avoid DNS issues
      retryWrites: true,
      authSource: 'admin',
      // Additional options for better DNS handling
      directConnection: false,
      maxIdleTimeMS: 30000,
      heartbeatFrequencyMS: 10000,
      // Retry configuration
      retryReads: true,
    };
    
    console.log(`🔄 Attempting to connect to MongoDB (attempt ${retryCount + 1})...`);
    cached!.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached!.conn = await cached!.promise;
    console.log('✅ Connected to MongoDB successfully');
    
    // Check available collections (optional)
    try {
      const db = cached!.conn.connection.db;
      const collections = await db.listCollections().toArray();
      console.log('📋 Available collections:', collections.map((c: any) => c.name));
    } catch (e) {
      console.log('ℹ️ Database may be empty, collections will be created on first use');
    }
    
    return cached!.conn;
  } catch (e: any) {
    cached!.promise = null;
    console.error('❌ MongoDB connection error:', e);
    
    // Handle specific DNS resolution errors
    if (e.code === 'ESERVFAIL' || e.code === 'ENOTFOUND' || e.syscall === 'querySrv') {
      console.error('❌ DNS resolution failed for MongoDB Atlas cluster');
      console.error('This could be due to:');
      console.error('  1. Network connectivity issues');
      console.error('  2. Firewall blocking DNS queries');
      console.error('  3. MongoDB Atlas cluster may be paused or deleted');
      console.error('  4. Incorrect cluster hostname');
    }
    
    // Retry logic for both development and production (up to 3 attempts)
    if (retryCount < 3) {
      const waitTime = Math.min(2000 * Math.pow(2, retryCount), 10000); // Exponential backoff, max 10s
      console.log(`⏳ Retrying connection in ${waitTime/1000} seconds... (${retryCount + 1}/4)`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return dbConnect(retryCount + 1);
    }
    
    // Don't throw in production, return null instead
    if (process.env.NODE_ENV === 'development') {
      throw e;
    }
    return null;
  }
}

export default dbConnect; 