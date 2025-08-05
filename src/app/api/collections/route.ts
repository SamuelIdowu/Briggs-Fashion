import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Collection from '@/models/Collection';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    let collections;
    try {
      collections = await Collection.find({ isActive: true })
        .sort({ createdAt: -1 })
        .lean();
    } catch (dbError) {
      console.warn('⚠️ Database query failed for collections, using test data:', dbError);
      // Fallback test data
      collections = [
        {
          _id: 'suits',
          name: 'Suits',
          description: 'Premium suits collection',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: 'shirts',
          name: 'Shirts',
          description: 'Fine shirts collection',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: 'accessories',
          name: 'Accessories',
          description: 'Style accessories',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
    }

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
