import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/database';
import Product from '../../../../models/Product';
import Collection from '../../../../models/Collection';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get basic counts
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const featuredProducts = await Product.countDocuments({ isFeatured: true });
    const totalCollections = await Collection.countDocuments();
    const activeCollections = await Collection.countDocuments({ isActive: true });

    // Get recent products
    const recentProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name category type price images isActive isFeatured createdAt');

    // Get recent collections
    const recentCollections = await Collection.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('products', 'name')
      .select('name description products isActive createdAt');

    // Get category distribution
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get type distribution
    const typeStats = await Product.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalProducts,
          activeProducts,
          featuredProducts,
          totalCollections,
          activeCollections,
        },
        recentProducts,
        recentCollections,
        categoryStats,
        typeStats,
      }
    });
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 