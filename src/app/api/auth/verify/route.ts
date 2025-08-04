import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/database';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    try {
      // Verify JWT token
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET environment variable is not set');
      }
      
      const decoded = verify(token, jwtSecret) as any;
      
      // Find user in database
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user || !user.isActive) {
        return NextResponse.json(
          { error: 'User not found or inactive' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 