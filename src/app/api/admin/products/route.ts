import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');

    const query: any = {};

    if (category) query.category = category;
    if (type) query.type = type;
    if (isActive !== null) query.isActive = isActive === 'true';
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Validate required fields
    const { name, description, category, type, price } = body;
    if (!name || !description || !category || !type || !price) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const product = new Product({
      ...body,
      price: parseFloat(price),
      images: body.images || [],
      variations: {
        sizes: body.variations?.sizes || [],
        colors: body.variations?.colors || [],
        materials: body.variations?.materials || []
      },
      details: {
        materialComposition: body.details?.materialComposition || '',
        careInstructions: body.details?.careInstructions || '',
        sizingInfo: body.details?.sizingInfo || ''
      },
      seo: {
        metaTitle: body.seo?.metaTitle || name,
        metaDescription: body.seo?.metaDescription || description.substring(0, 160),
        keywords: body.seo?.keywords || []
      },
      isActive: body.isActive !== false,
      isFeatured: body.isFeatured || false
    });

    await product.save();

    return NextResponse.json({
      success: true,
      data: product
    }, { status: 201 });
  } catch (error) {
    console.error('Create Product API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 