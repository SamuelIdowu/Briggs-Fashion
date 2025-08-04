const { config } = require("dotenv");
const path = require("path");

// Load .env.local file first
config({ path: path.resolve(process.cwd(), ".env.local") });

// Now import the database connection
const dbConnect = require("../src/lib/database").default;
const User = require("../src/models/User").default;
const Product = require("../src/models/Product").default;
const Collection = require("../src/models/Collection").default;
const SiteSettings = require("../src/models/SiteSettings").default;
const { products, collections, siteSettings } = require("../src/lib/data");

console.log(
  "MONGODB_URI_PROD:",
  process.env.MONGODB_URI_PROD ? "✅ Set" : "❌ Not set"
);

async function seed() {
  try {
    await dbConnect();
    console.log("Connected to database");

    // Clear existing data to avoid duplicates
    await Product.deleteMany({});
    await Collection.deleteMany({});
    await SiteSettings.deleteMany({});

    // Create admin user if method exists
    if (typeof User.createAdminIfNotExists === "function") {
      await User.createAdminIfNotExists();
      console.log("Admin user created/verified");
    } else {
      console.log("Skipping admin user creation (method not found)");
    }

    // Insert products and build a map from string id to MongoDB _id
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products created`);
    const idMap = new Map();
    for (const prod of createdProducts) {
      idMap.set(prod.id, prod._id);
    }

    // Map collections' product string IDs to ObjectIds
    const collectionsWithObjectIds = collections.map((col) => ({
      ...col,
      products: col.products.map((pid) => idMap.get(pid)),
    }));

    // Insert collections with ObjectId references
    await Collection.insertMany(collectionsWithObjectIds);
    console.log(`${collectionsWithObjectIds.length} collections created`);

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
