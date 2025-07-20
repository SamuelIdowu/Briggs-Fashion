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

    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Upload the file to a cloud storage service (AWS S3, Cloudinary, etc.)
    // 2. Generate multiple sizes for responsive images
    // 3. Store the file metadata in the database
    // 4. Return the public URL

    // For development, we'll return a mock URL
    const mockImageUrl = `https://via.placeholder.com/800x600/FFD700/000000?text=${encodeURIComponent(file.name)}`;

    return NextResponse.json({
      message: 'Image uploaded successfully',
      imageUrl: mockImageUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 