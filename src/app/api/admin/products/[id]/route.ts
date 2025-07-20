import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { products } from '@/lib/data';

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin token
    const decoded = verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const updateData = await request.json();

    // Find the product
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Validate category and type if provided
    if (updateData.category) {
      const validCategories = ['traditional', 'casual', 'custom'];
      if (!validCategories.includes(updateData.category)) {
        return NextResponse.json(
          { error: 'Invalid category. Must be one of: traditional, casual, custom' },
          { status: 400 }
        );
      }
    }

    if (updateData.type) {
      const validTypes = ['ready-made', 'made-to-order'];
      if (!validTypes.includes(updateData.type)) {
        return NextResponse.json(
          { error: 'Invalid type. Must be one of: ready-made, made-to-order' },
          { status: 400 }
        );
      }
    }

    // Update the product
    const updatedProduct = {
      ...products[productIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    // In a real application, you would update the database here
    // products[productIndex] = updatedProduct;

    return NextResponse.json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin token
    const decoded = verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Find the product
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // In a real application, you would delete from database here
    // products.splice(productIndex, 1);

    return NextResponse.json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 