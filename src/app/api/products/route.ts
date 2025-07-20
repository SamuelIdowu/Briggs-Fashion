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

    // Filters
    const filters: any = {};
    if (searchParams.get('category')) {
      filters.category = searchParams.get('category');
    }
    if (searchParams.get('type')) {
      filters.type = searchParams.get('type');
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
    if (searchParams.get('q')) {
      filters.$text = { $search: searchParams.get('q') };
    }
    filters.isActive = true;

    // Query products
    const [products, total] = await Promise.all([
      Product.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filters),
    ]);

    return NextResponse.json({
      products,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 