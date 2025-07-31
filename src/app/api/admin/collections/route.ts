import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Collection from '@/models/Collection';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');

    const query: any = {};

    if (isActive !== null) query.isActive = isActive === 'true';
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [collections, total] = await Promise.all([
      Collection.find(query)
        .populate('products', 'name images price')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Collection.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        collections,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Collections API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Validate required fields
    const { name } = body;
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Collection name is required' },
        { status: 400 }
      );
    }

    const collection = new Collection({
      name,
      description: body.description || '',
      products: body.products || [],
      isActive: body.isActive !== false
    });

    await collection.save();

    return NextResponse.json({
      success: true,
      data: collection
    }, { status: 201 });
  } catch (error) {
    console.error('Create Collection API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create collection' },
      { status: 500 }
    );
  }
} 