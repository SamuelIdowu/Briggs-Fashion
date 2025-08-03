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

    console.log('🔍 API Request URL:', request.url);
    console.log('🔍 Search Params:', Object.fromEntries(searchParams.entries()));

    // Test: Check if products exist in database
    const totalProducts = await Product.countDocuments({});
    console.log('📊 Total products in database:', totalProducts);

    // Test: Check if text index exists
    try {
      const indexes = await Product.collection.getIndexes();
      console.log('📋 Database indexes:', Object.keys(indexes));
    } catch (indexError) {
      console.log('❌ Could not check indexes:', indexError);
    }

    // Filters
    const filters: any = {};
    if (searchParams.get('category')) {
      filters.category = searchParams.get('category');
      console.log('✅ Category filter applied:', filters.category);
    }
    if (searchParams.get('type')) {
      filters.type = searchParams.get('type');
      console.log('✅ Type filter applied:', filters.type);
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
      console.log('✅ Search query applied:', searchQuery);
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

    console.log('🔍 Final filters object:', filters);
    console.log('🔍 Category filter value:', filters.category);

    // Query products
    const [products, total] = await Promise.all([
      Product.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filters),
    ]);

    console.log(`📊 Found ${products.length} products out of ${total} total`);
    console.log('📋 Products categories:', products.map(p => p.category));

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
    console.error('❌ Products API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 