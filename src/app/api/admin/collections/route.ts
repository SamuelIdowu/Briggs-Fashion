import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// Mock admin user for development
const ADMIN_USER = {
  id: '1',
  name: 'Admin User',
  email: 'admin@briggsfashion.com',
  role: 'admin' as const,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Middleware to verify admin token
function verifyAdminToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    if (decoded.email === ADMIN_USER.email && ADMIN_USER.isActive) {
      return decoded;
    }
  } catch (error) {
    return null;
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const decoded = verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const collectionData = await request.json();

    // Validate required fields
    if (!collectionData.name) {
      return NextResponse.json(
        { error: 'Collection name is required' },
        { status: 400 }
      );
    }

    // Create new collection
    const newCollection = {
      id: `collection_${Date.now()}`,
      name: collectionData.name,
      description: collectionData.description || '',
      products: collectionData.products || [],
      isActive: collectionData.isActive !== false, // Default to true
      createdAt: new Date().toISOString(),
    };

    // In a real application, you would save to database here

    return NextResponse.json({
      message: 'Collection created successfully',
      collection: newCollection,
    }, { status: 201 });
  } catch (error) {
    console.error('Create collection error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 