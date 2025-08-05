import dotenv from 'dotenv';

// Load environment variables from .env.local BEFORE importing other modules
dotenv.config({ path: '.env.local' });
console.log('🔍 Debug: MONGODB_URI =', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
console.log('🔍 Debug: MONGODB_URI_PROD =', process.env.MONGODB_URI_PROD ? 'SET' : 'NOT SET');

// Now import the modules that depend on environment variables
import dbConnect from '../src/lib/database';
import Product from '../src/models/Product';
import Collection from '../src/models/Collection';
import User from '../src/models/User';

async function initDatabase() {
  try {
    console.log('🔌 Connecting to database...');
    await dbConnect();
    
    console.log('📋 Checking collections...');
    
    // Check if collections exist and create them if needed
    const db = Product.db;
    if (!db) {
      console.log('❌ Database connection not available');
      return;
    }
    const collections = await db.listCollections();
    console.log('📋 Existing collections:', collections.map((c: any) => c.name));
    
    // Create text indexes for search functionality
    try {
      console.log('🔍 Creating text indexes...');
      await Product.collection.createIndex(
        { 
          name: 'text', 
          description: 'text', 
          category: 'text', 
          type: 'text',
          'seo.keywords': 'text'
        },
        { 
          name: 'product_search_index',
          weights: {
            name: 10,
            description: 5,
            category: 3,
            type: 3,
            'seo.keywords': 2
          }
        }
      );
      console.log('✅ Text index created for products');
    } catch (indexError: unknown) {
      const errorMessage = indexError instanceof Error ? indexError.message : 'Unknown error';
      console.log('ℹ️ Text index may already exist:', errorMessage);
    }
    
    // Create other useful indexes
    try {
      await Product.collection.createIndex({ category: 1 });
      await Product.collection.createIndex({ type: 1 });
      await Product.collection.createIndex({ price: 1 });
      await Product.collection.createIndex({ isActive: 1 });
      await Product.collection.createIndex({ createdAt: -1 });
      console.log('✅ Basic indexes created for products');
    } catch (indexError: unknown) {
      const errorMessage = indexError instanceof Error ? indexError.message : 'Unknown error';
      console.log('ℹ️ Basic indexes may already exist:', errorMessage);
    }
    
    // Create indexes for collections
    try {
      await Collection.collection.createIndex({ name: 'text', description: 'text' });
      await Collection.collection.createIndex({ isActive: 1 });
      console.log('✅ Indexes created for collections');
    } catch (indexError: unknown) {
      const errorMessage = indexError instanceof Error ? indexError.message : 'Unknown error';
      console.log('ℹ️ Collection indexes may already exist:', errorMessage);
    }
    
    // Create indexes for users
    try {
      await User.collection.createIndex({ email: 1 }, { unique: true });
      console.log('✅ Indexes created for users');
    } catch (indexError: unknown) {
      const errorMessage = indexError instanceof Error ? indexError.message : 'Unknown error';
      console.log('ℹ️ User indexes may already exist:', errorMessage);
    }
    
    console.log('✅ Database initialization completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initDatabase(); 