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

    const productData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'type', 'price'];
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate category and type
    const validCategories = ['traditional', 'casual', 'custom'];
    const validTypes = ['ready-made', 'made-to-order'];

    if (!validCategories.includes(productData.category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be one of: traditional, casual, custom' },
        { status: 400 }
      );
    }

    if (!validTypes.includes(productData.type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be one of: ready-made, made-to-order' },
        { status: 400 }
      );
    }

    // Create new product
    const newProduct = {
      id: `product_${Date.now()}`,
      name: productData.name,
      description: productData.description,
      category: productData.category,
      type: productData.type,
      images: productData.images || [],
      price: productData.price,
      variations: {
        sizes: productData.variations?.sizes || [],
        colors: productData.variations?.colors || [],
        materials: productData.variations?.materials || [],
      },
      details: {
        materialComposition: productData.details?.materialComposition || '',
        careInstructions: productData.details?.careInstructions || '',
        sizingInfo: productData.details?.sizingInfo || '',
      },
      seo: {
        metaTitle: productData.seo?.metaTitle || productData.name,
        metaDescription: productData.seo?.metaDescription || productData.description,
        keywords: productData.seo?.keywords || [],
      },
      isActive: productData.isActive !== false, // Default to true
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real application, you would save to database here
    // For now, we'll just return the created product
    // products.push(newProduct);

    return NextResponse.json({
      message: 'Product created successfully',
      product: newProduct,
    }, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 