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

    // Calculate dashboard statistics
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.isActive).length;
    
    // Mock data for development
    const mockStats = {
      totalProducts,
      totalOrders: 156,
      totalCustomers: 89,
      totalRevenue: 2450000, // in kobo (₦24,500)
      productViews: 1247,
      whatsappInquiries: 234,
      monthlyRevenue: 450000, // in kobo (₦4,500)
      activeProducts,
    };

    const recentOrders = [
      {
        id: '1',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        date: new Date().toISOString(),
        status: 'Pending' as const,
        total: 15000,
      },
      {
        id: '2',
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        date: new Date(Date.now() - 86400000).toISOString(),
        status: 'Processing' as const,
        total: 25000,
      },
      {
        id: '3',
        customerName: 'Mike Johnson',
        customerEmail: 'mike@example.com',
        date: new Date(Date.now() - 172800000).toISOString(),
        status: 'Shipped' as const,
        total: 18000,
      },
    ];

    const popularProducts = products
      .filter(p => p.isActive)
      .slice(0, 5)
      .map(product => ({
        id: product.id,
        name: product.name,
        views: Math.floor(Math.random() * 100) + 10,
        inquiries: Math.floor(Math.random() * 20) + 1,
      }));

    return NextResponse.json({
      stats: mockStats,
      recentOrders,
      popularProducts,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 