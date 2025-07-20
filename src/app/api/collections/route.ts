import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Collection from '@/models/Collection';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    
    const filter: any = {};
    if (isActive !== null) {
      filter.isActive = isActive === 'true';
    }
    
    const collections = await Collection.find(filter).sort({ createdAt: -1 });
    
    return NextResponse.json({ collections });
    
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
} 