import dbConnect from '../src/lib/database';
import User from '../src/models/User';
import Product from '../src/models/Product';
import Collection from '../src/models/Collection';
import SiteSettings from '../src/models/SiteSettings';

async function seed() {
  try {
    await dbConnect();
    console.log('Connected to database');

    // Create admin user
    await User.createAdminIfNotExists();
    console.log('Admin user created/verified');

    // Create sample products
    const products = await Product.create([
      {
        name: 'Traditional Agbada',
        description: 'Elegant traditional Nigerian Agbada with intricate embroidery and premium fabric.',
        category: 'traditional',
        type: 'ready-made',
        images: [
          'https://placehold.co/600x800/FFD700/000000?text=Agbada+1',
          'https://placehold.co/600x800/FFD700/000000?text=Agbada+2',
        ],
        price: 45000, // 45,000 NGN
        variations: {
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Gold', 'Blue', 'Green'],
          materials: ['Cotton', 'Silk'],
        },
        details: {
          materialComposition: '100% Premium Cotton',
          careInstructions: 'Dry clean only',
          sizingInfo: 'Traditional fit with room for comfort',
        },
        seo: {
          metaTitle: 'Traditional Agbada - Briggs Fashion',
          metaDescription: 'Elegant traditional Nigerian Agbada with premium fabric and intricate embroidery.',
          keywords: ['agbada', 'traditional', 'nigerian', 'fashion', 'men'],
        },
        isActive: true,
        isFeatured: true,
      },
      {
        name: 'Modern Dashiki',
        description: 'Contemporary dashiki design perfect for modern occasions.',
        category: 'traditional',
        type: 'ready-made',
        images: [
          'https://placehold.co/600x800/FFD700/000000?text=Dashiki+1',
          'https://placehold.co/600x800/FFD700/000000?text=Dashiki+2',
        ],
        price: 25000,
        variations: {
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['White', 'Black', 'Red'],
          materials: ['Cotton'],
        },
        details: {
          materialComposition: '100% Cotton',
          careInstructions: 'Machine wash cold',
          sizingInfo: 'Modern fit',
        },
        seo: {
          metaTitle: 'Modern Dashiki - Briggs Fashion',
          metaDescription: 'Contemporary dashiki design for modern occasions.',
          keywords: ['dashiki', 'modern', 'african', 'fashion'],
        },
        isActive: true,
        isFeatured: true,
      },
      {
        name: 'Casual Polo Shirt',
        description: 'Comfortable and stylish polo shirt for everyday wear.',
        category: 'casual',
        type: 'ready-made',
        images: [
          'https://placehold.co/600x800/FFD700/000000?text=Polo+1',
        ],
        price: 8000,
        variations: {
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['White', 'Black', 'Navy'],
          materials: ['Cotton'],
        },
        details: {
          materialComposition: '100% Cotton',
          careInstructions: 'Machine wash',
          sizingInfo: 'Regular fit',
        },
        seo: {
          metaTitle: 'Casual Polo Shirt - Briggs Fashion',
          metaDescription: 'Comfortable and stylish polo shirt for everyday wear.',
          keywords: ['polo', 'casual', 'shirt', 'everyday'],
        },
        isActive: true,
        isFeatured: false,
      },
    ]);

    console.log(`${products.length} products created`);

    // Create collections
    const collections = await Collection.create([
      {
        name: 'Traditional Wear',
        description: 'Our collection of traditional Nigerian attire including Agbada, Dashiki, and more.',
        products: [products[0]._id, products[1]._id],
        isActive: true,
      },
      {
        name: 'Casual Wear',
        description: 'Comfortable and stylish casual wear for everyday occasions.',
        products: [products[2]._id],
        isActive: true,
      },
      {
        name: 'Featured Collection',
        description: 'Our handpicked featured products.',
        products: [products[0]._id, products[1]._id],
        isActive: true,
      },
    ]);

    console.log(`${collections.length} collections created`);

    // Create site settings
    const settings = await SiteSettings.getSettings();
    if (!settings.businessInfo.name) {
      settings.businessInfo = {
        name: 'Briggs Fashion',
        address: 'Lagos, Nigeria',
        phone: '+2341234567890',
        whatsappNumbers: {
          sales: '+2341234567890',
          custom: '+2341234567891',
          support: '+2341234567892',
        },
        businessHours: 'Monday - Friday: 9AM - 6PM, Saturday: 10AM - 4PM',
      };
      settings.homepage = {
        heroTitle: 'Elegant Nigerian Fashion',
        heroDescription: 'Discover our collection of traditional and modern Nigerian fashion for the discerning gentleman.',
        featuredProducts: [products[0]._id, products[1]._id],
      };
      settings.seo = {
        siteTitle: 'Briggs Fashion - Nigerian Fashion E-commerce',
        siteDescription: 'Premium Nigerian fashion for men. Traditional and modern wear with custom tailoring services.',
        siteKeywords: ['nigerian', 'fashion', 'men', 'traditional', 'casual', 'tailoring'],
      };
      await settings.save();
      console.log('Site settings updated');
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed(); 