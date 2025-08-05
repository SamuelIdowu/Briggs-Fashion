const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI_PROD || process.env.MONGODB_URI;

console.log('🧪 Testing MongoDB Connection...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Connection URI:', MONGODB_URI ? MONGODB_URI.replace(/:[^:@]+@/, ':***@') : 'Not found');

async function testConnection() {
  if (!MONGODB_URI) {
    console.error('❌ MongoDB URI not found');
    process.exit(1);
  }

  const opts = {
    bufferCommands: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    family: 4, // Force IPv4
    retryWrites: true,
    authSource: 'admin',
  };

  try {
    console.log('🔄 Connecting...');
    await mongoose.connect(MONGODB_URI, opts);
    console.log('✅ MongoDB connection successful!');
    
    // Test a simple operation
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`📂 Found ${collections.length} collections:`, collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error(error);
    
    if (error.code === 'ESERVFAIL' || error.code === 'ENOTFOUND' || error.syscall === 'querySrv') {
      console.error('\n🔍 DNS Resolution Issues Detected:');
      console.error('  • Check your internet connection');
      console.error('  • Verify the MongoDB Atlas cluster is running');
      console.error('  • Check if your IP is whitelisted in MongoDB Atlas');
      console.error('  • Try using the alternative connection string format');
    }
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

testConnection();
