// API Constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
export const API_TIMEOUT = 10000; // 10 seconds

// Pagination Constants
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;

// Product Constants
export const PRODUCT_CATEGORIES = ['traditional', 'casual', 'custom'] as const;
export const PRODUCT_TYPES = ['ready-made', 'made-to-order'] as const;

// WhatsApp Constants
export const WHATSAPP_NUMBERS = {
  sales: '+234 801 234 5678',
  custom: '+234 802 345 6789',
  support: '+234 803 456 7890',
} as const;

// Business Constants
export const BUSINESS_INFO = {
  name: 'Briggs Fashion',
  address: '123 Fashion Street, Lagos, Nigeria',
  phone: '+234 801 234 5678',
  email: 'info@briggsfashion.com',
  businessHours: 'Monday - Saturday: 9:00 AM - 6:00 PM, Sunday: 12:00 PM - 4:00 PM',
} as const;

// SEO Constants
export const DEFAULT_SEO = {
  title: 'Briggs Fashion - Premium Nigerian Menswear',
  description: 'Experience unparalleled craftsmanship with our exclusive collection of traditional and modern menswear.',
  keywords: ['nigerian fashion', 'menswear', 'traditional wear', 'custom tailoring', 'african fashion'],
  ogImage: '/og-image.jpg',
} as const;

// Performance Constants
export const IMAGE_QUALITY = 85;
export const IMAGE_SIZES = {
  thumbnail: 300,
  small: 600,
  medium: 800,
  large: 1200,
} as const;

// Animation Constants
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  PRODUCT_NOT_FOUND: 'Product not found.',
  FETCH_FAILED: 'Failed to fetch data. Please try again.',
  WHATSAPP_ERROR: 'Failed to open WhatsApp. Please try again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  WHATSAPP_OPENED: 'WhatsApp opened successfully.',
  INQUIRY_SENT: 'Your inquiry has been sent successfully.',
} as const; 