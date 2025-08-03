import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Collection from '@/models/Collection';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const collections = await Collection.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        collections
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