const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://briggs:briggsfashion@briggs.nho4bht.mongodb.net/briggs-fashion?retryWrites=true&w=majority&appName=Briggs';

async function addTestData() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('briggs-fashion');

    // Add test collections
    const collections = [
      {
        name: 'Suits',
        description: 'Premium suits collection',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shirts',
        description: 'Fine shirts collection',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Accessories',
        description: 'Style accessories',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await db.collection('collections').deleteMany({});
    const collectionsResult = await db.collection('collections').insertMany(collections);
    console.log(`✅ Added ${collectionsResult.insertedCount} collections`);

    // Add test products
    const products = [
      {
        name: 'Premium Navy Suit',
        description: 'A classic navy suit perfect for business occasions',
        price: 599,
        category: 'Suits',
        type: 'formal',
        images: ['/placeholder-product.jpg'],
        isActive: true,
        isFeatured: true,
        tags: ['business', 'formal', 'navy'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy', 'Black'],
        materials: ['Wool'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'White Dress Shirt',
        description: 'Classic white dress shirt for professional wear',
        price: 89,
        category: 'Shirts',
        type: 'formal',
        images: ['/placeholder-product.jpg'],
        isActive: true,
        isFeatured: false,
        tags: ['dress', 'formal', 'white'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Light Blue'],
        materials: ['Cotton'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Casual Cotton Shirt',
        description: 'Comfortable casual shirt for everyday wear',
        price: 49,
        category: 'Shirts',
        type: 'casual',
        images: ['/placeholder-product.jpg'],
        isActive: true,
        isFeatured: false,
        tags: ['casual', 'cotton', 'comfortable'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blue', 'Gray', 'White'],
        materials: ['Cotton'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Leather Belt',
        description: 'Premium leather belt with silver buckle',
        price: 79,
        category: 'Accessories',
        type: 'accessory',
        images: ['/placeholder-product.jpg'],
        isActive: true,
        isFeatured: true,
        tags: ['leather', 'belt', 'accessory'],
        sizes: ['32', '34', '36', '38', '40'],
        colors: ['Black', 'Brown'],
        materials: ['Leather'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Charcoal Gray Suit',
        description: 'Elegant charcoal gray suit for special occasions',
        price: 749,
        category: 'Suits',
        type: 'formal',
        images: ['/placeholder-product.jpg'],
        isActive: true,
        isFeatured: true,
        tags: ['formal', 'gray', 'elegant'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Charcoal', 'Black'],
        materials: ['Wool'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await db.collection('products').deleteMany({});
    const productsResult = await db.collection('products').insertMany(products);
    console.log(`✅ Added ${productsResult.insertedCount} products`);

    console.log('🎉 Test data added successfully!');

  } catch (error) {
    console.error('❌ Error adding test data:', error);
  } finally {
    await client.close();
  }
}

addTestData();
