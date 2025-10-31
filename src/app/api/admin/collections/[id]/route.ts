import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/database';
import Collection from '../../../../../models/Collection';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await dbConnect();
    
    const collection = await Collection.findById(id)
      .populate('products', 'name images price category type');
    
    if (!collection) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: collection
    });
  } catch (error) {
    console.error('Get Collection API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch collection' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      {
        name,
        description: body.description || '',
        products: body.products || [],
        isActive: body.isActive !== false
      },
      { new: true, runValidators: true }
    ).populate('products', 'name images price category type');

    if (!updatedCollection) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedCollection
    });
  } catch (error) {
    console.error('Update Collection API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update collection' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await dbConnect();
    
    const collection = await Collection.findByIdAndDelete(id);
    
    if (!collection) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Collection deleted successfully'
    });
  } catch (error) {
    console.error('Delete Collection API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete collection' },
      { status: 500 }
    );
  }
} 