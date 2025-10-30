import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Parse query params for filters and pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const skip = (page - 1) * limit;

    if (process.env.NODE_ENV !== 'production') {
      console.log('🔍 API Request URL:', request.url);
      console.log('🔍 Search Params:', Object.fromEntries(searchParams.entries()));

      // Test: Check if products exist in database
      const totalProducts = await Product.countDocuments({});
      console.log('📊 Total products in database:', totalProducts);

      // Test: Check if text index exists (only if collection exists)
      try {
        const totalProductsCheck = await Product.countDocuments({});
        if (totalProductsCheck > 0) {
          const indexes = await Product.collection.getIndexes();
          console.log('📋 Database indexes:', Object.keys(indexes));
        } else {
          console.log('📋 No products found, skipping index check');
        }
      } catch (indexError: unknown) {
        const errorMessage = indexError instanceof Error ? indexError.message : 'Unknown error';
        console.log('❌ Could not check indexes (collection may not exist):', errorMessage);
      }
    }

    // Filters
    const filters: any = {};
    if (searchParams.get('category')) {
      filters.category = searchParams.get('category');
      if (process.env.NODE_ENV !== 'production') {
        console.log('✅ Category filter applied:', filters.category);
      }
    }
    if (searchParams.get('type')) {
      filters.type = searchParams.get('type');
      if (process.env.NODE_ENV !== 'production') {
        console.log('✅ Type filter applied:', filters.type);
      }
    }
    if (searchParams.get('size')) {
      filters['variations.sizes'] = searchParams.get('size');
    }
    if (searchParams.get('color')) {
      filters['variations.colors'] = searchParams.get('color');
    }
    if (searchParams.get('material')) {
      filters['variations.materials'] = searchParams.get('material');
    }
    if (searchParams.get('minPrice') || searchParams.get('maxPrice')) {
      filters.price = {};
      if (searchParams.get('minPrice')) {
        filters.price.$gte = parseInt(searchParams.get('minPrice')!, 10);
      }
      if (searchParams.get('maxPrice')) {
        filters.price.$lte = parseInt(searchParams.get('maxPrice')!, 10);
      }
    }
    // Handle search parameter (accept both 'search' and 'q')
    const searchQuery = searchParams.get('search') || searchParams.get('q');
    if (searchQuery) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('✅ Search query applied:', searchQuery);
      }
      // Use regex for partial matching instead of strict text search
      const searchRegex = new RegExp(searchQuery, 'i'); // 'i' for case-insensitive
      filters.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { 'seo.keywords': searchRegex },
        { category: searchRegex },
        { type: searchRegex }
      ];
    }
    filters.isActive = true;

    if (process.env.NODE_ENV !== 'production') {
      console.log('🔍 Final filters object:', filters);
      console.log('🔍 Category filter value:', filters.category);
    }

    // Query products
    let products, total;
    try {
      [products, total] = await Promise.all([
        Product.find(filters)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        Product.countDocuments(filters),
      ]);
    } catch (dbError) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('⚠️ Database query failed, using test data:', dbError);
      }
      // Fallback test data
      const testProducts = [
        {
          _id: '1',
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
          _id: '2',
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
          _id: '3',
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
          _id: '4',
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
          _id: '5',
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
      
      // Apply filters to test data
      let filteredProducts = testProducts;
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
      if (filters.type) {
        filteredProducts = filteredProducts.filter(p => p.type === filters.type);
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query)
        );
      }
      
      total = filteredProducts.length;
      products = filteredProducts.slice(skip, skip + limit);
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`📊 Found ${products.length} products out of ${total} total`);
      console.log('📋 Products categories:', products.map(p => p.category));
    }

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? page + 1 : null,
        prevPage: hasPrevPage ? page - 1 : null,
      },
      filters,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('❌ Products API error:', error);
    } else {
      // In production, log a generic error to avoid exposing internal details
      console.error('❌ Products API error');
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 