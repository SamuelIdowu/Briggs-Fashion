import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Collection from '@/models/Collection';
import Product from '@/models/Product';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const collection = await Collection.findById(params.id).populate('products');
    if (!collection) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      collection,
    });
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection' },
      { status: 500 }
    );
  }
} 