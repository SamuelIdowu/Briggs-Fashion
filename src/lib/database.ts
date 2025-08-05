import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: any; promise: any } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI_PROD || process.env.MONGODB_URI;

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

async function dbConnect() {
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
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    cached!.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached!.conn = await cached!.promise;
    console.log('✅ Connected to MongoDB');
  } catch (e) {
    cached!.promise = null;
    console.error('❌ MongoDB connection error:', e);
    // Don't throw in production, return null instead
    if (process.env.NODE_ENV === 'development') {
      throw e;
    }
    return null;
  }

  return cached!.conn;
}

export default dbConnect; 