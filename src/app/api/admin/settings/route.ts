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

// Mock site settings for development
let siteSettings = {
  businessInfo: {
    name: 'Briggs Fashion',
    address: '123 Fashion Street, Lagos, Nigeria',
    phone: '+234 123 456 7890',
    whatsappNumbers: {
      sales: '+234 123 456 7890',
      custom: '+234 123 456 7891',
      support: '+234 123 456 7892',
    },
    businessHours: 'Monday - Friday: 9AM - 6PM, Saturday: 10AM - 4PM',
  },
  homepage: {
    heroTitle: 'Elegant Nigerian Fashion',
    heroDescription: 'Discover our collection of traditional and modern Nigerian fashion for the discerning gentleman.',
    featuredProducts: [],
  },
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

export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const decoded = verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      settings: siteSettings,
    });
  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify admin token
    const decoded = verifyAdminToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const updateData = await request.json();

    // Update site settings
    siteSettings = {
      ...siteSettings,
      ...updateData,
    };

    // In a real application, you would save to database here

    return NextResponse.json({
      message: 'Settings updated successfully',
      settings: siteSettings,
    });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 