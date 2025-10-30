import { config } from 'dotenv';
import path from 'path';

// Load .env.local file FIRST
config({ path: path.resolve(process.cwd(), '.env.local') });

// Now import after environment is loaded
import dbConnect from '../src/lib/database';
import User from '../src/models/User';
import Product from '../src/models/Product';
import Collection from '../src/models/Collection';
import SiteSettings from '../src/models/SiteSettings';
import { products, collections, siteSettings } from '../src/lib/data';


if (process.env.NODE_ENV !== 'production') {
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
}
async function seed() {
  try {
    await dbConnect();
    if (process.env.NODE_ENV !== 'production') {
      console.log('Connected to database');
    }

    // Clear existing data to avoid duplicates
    await Product.deleteMany({});
    await Collection.deleteMany({});
    await SiteSettings.deleteMany({});

    // Create admin user if method exists
    if (typeof (User as any).createAdminIfNotExists === 'function') {
      await (User as any).createAdminIfNotExists();
      if (process.env.NODE_ENV !== 'production') {
        console.log('Admin user created/verified');
      }
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Skipping admin user creation (method not found)');
      }
    }

    // Insert products and build a map from string id to MongoDB _id
    const createdProducts = await Product.insertMany(products);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`${createdProducts.length} products created`);
    }
    const idMap = new Map<string, any>();
    for (const prod of createdProducts) {
      idMap.set(prod.id, prod._id);
    }

    // Map collections' product string IDs to ObjectIds
    const collectionsWithObjectIds = collections.map(col => ({
      ...col,
      products: col.products.map(pid => idMap.get(pid)),
    }));

    // Insert collections with ObjectId references
    await Collection.insertMany(collectionsWithObjectIds);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`${collectionsWithObjectIds.length} collections created`);
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('Database seeding completed successfully!');
    }
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed(); 