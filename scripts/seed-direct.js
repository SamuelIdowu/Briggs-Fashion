const { config } = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

// Load .env.local file
config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI_PROD || process.env.MONGODB_URI;

console.log(
  "MONGODB_URI_PROD:",
  process.env.MONGODB_URI_PROD ? "✅ Set" : "❌ Not set"
);
console.log("Using URI:", MONGODB_URI ? "✅ Available" : "❌ Not available");

if (!MONGODB_URI) {
  console.error("❌ No MongoDB URI found in environment variables");
  process.exit(1);
}

// Sample data for seeding
const products = [
  {
    name: "Traditional Igbo Attire",
    description: "Beautiful traditional Igbo clothing with intricate designs",
    price: 25000,
    category: "Traditional Wear",
    type: "Clothing",
    isActive: true,
    isFeatured: true,
    images: ["/inspo1.jpg", "/inspo2.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Gold", "Green"],
    stock: 50,
  },
  {
    name: "Casual Nigerian Dress",
    description: "Comfortable and stylish casual wear",
    price: 15000,
    category: "Casual Wear",
    type: "Clothing",
    isActive: true,
    isFeatured: true,
    images: ["/inspo3.jpg", "/inspo4.jpg"],
    sizes: ["S", "M", "L"],
    colors: ["Blue", "White", "Black"],
    stock: 30,
  },
];

const collections = [
  {
    name: "Traditional Collection",
    description: "Authentic traditional Nigerian wear",
    isActive: true,
    products: [],
  },
  {
    name: "Casual Collection",
    description: "Comfortable everyday wear",
    isActive: true,
    products: [],
  },
];

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Define schemas
    const productSchema = new mongoose.Schema({
      name: String,
      description: String,
      price: Number,
      category: String,
      type: String,
      isActive: Boolean,
      isFeatured: Boolean,
      images: [String],
      sizes: [String],
      colors: [String],
      stock: Number,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    });

    const collectionSchema = new mongoose.Schema({
      name: String,
      description: String,
      isActive: Boolean,
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    });

    // Create models
    const Product = mongoose.model("Product", productSchema);
    const Collection = mongoose.model("Collection", collectionSchema);

    // Clear existing data
    await Product.deleteMany({});
    await Collection.deleteMany({});
    console.log("🗑️ Cleared existing data");

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Insert collections
    const createdCollections = await Collection.insertMany(collections);
    console.log(`✅ Created ${createdCollections.length} collections`);

    console.log("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seed();
