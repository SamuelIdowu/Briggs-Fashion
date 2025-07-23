import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Collection from '@/models/Collection';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const collections = await Collection.find().lean();
    return NextResponse.json({ collections });
  } catch (error) {
    return NextResponse.json({ error: 'collections not found' }, { status: 404 });
  }
} 