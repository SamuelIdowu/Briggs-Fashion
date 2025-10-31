import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '../../../lib/database';
import SiteSettings from '../../../models/SiteSettings';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    let settings = await SiteSettings.findOne();
    
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    
    return NextResponse.json({ settings });
    
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
} 