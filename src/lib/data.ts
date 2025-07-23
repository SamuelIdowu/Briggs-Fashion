import type { Product, Order } from '@/types';

export const products: Product[] = [
  {
    id: 'agbada-001',
    name: 'Regal Agbada Ensemble',
    description: 'A masterpiece of tailoring, this Agbada set is perfect for making a grand entrance. It includes the grand boubou, a long-sleeved shirt, and matching trousers.',
    category: 'traditional',
    type: 'made-to-order',
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    price: 120000,
    variations: {
      sizes: ['S', 'M', 'L', 'XL', 'Custom'],
      colors: ['Royal Blue', 'Ivory White', 'Charcoal Black'],
      materials: ['Guinea Brocade', 'Aso-Oke', 'Lace'],
    },
    details: {
      materialComposition: '100% Premium Cotton Brocade',
      careInstructions: 'Dry clean only. Iron on low heat.',
      sizingInfo: 'Custom measurements required for the perfect fit. See our size guide.',
    },
    seo: {
      metaTitle: 'Regal Agbada Ensemble - Premium Nigerian Traditional Wear',
      metaDescription: 'Exquisite Agbada ensemble perfect for special occasions. Custom tailored with premium materials.',
      keywords: ['agbada', 'nigerian traditional wear', 'custom tailoring', 'premium fashion']
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'dashiki-001',
    name: 'Vibrant Ankara Dashiki',
    description: 'A modern take on the classic Dashiki, featuring a bold Ankara print. Comfortable and stylish for any casual or semi-formal event.',
    category: 'traditional',
    type: 'ready-made',
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    price: 45000,
    variations: {
      sizes: ['M', 'L', 'XL'],
      colors: ['Red/Gold Pattern', 'Blue/Green Pattern'],
      materials: ['Ankara Wax Print', 'Polished Cotton'],
    },
    details: {
      materialComposition: '100% Waxed Cotton',
      careInstructions: 'Machine wash cold. Hang to dry.',
      sizingInfo: 'Available in standard sizes. Check our ready-made chart.',
    },
    seo: {
      metaTitle: 'Vibrant Ankara Dashiki - Modern Nigerian Traditional Wear',
      metaDescription: 'Contemporary Dashiki with bold Ankara prints. Perfect for cultural events and casual wear.',
      keywords: ['dashiki', 'ankara', 'nigerian traditional', 'african fashion', 'ready-made']
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'kaftan-001',
    name: 'Senator Style Kaftan',
    description: 'Embody sophistication with this sleek Senator-style kaftan. Its minimalist design is perfect for the modern Nigerian man.',
    category: 'traditional',
    type: 'ready-made',
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png', 'https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    price: 65000,
    variations: {
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Navy Blue', 'Burgundy', 'Grey'],
      materials: ['Italian Cashmere', 'Polished Cotton'],
    },
    details: {
      materialComposition: '70% Wool, 30% Polyester Blend',
      careInstructions: 'Dry clean recommended. Can be hand washed cold.',
      sizingInfo: 'True to size. Consult our measurement guide.',
    },
    seo: {
      metaTitle: 'Senator Style Kaftan - Sophisticated Nigerian Traditional Wear',
      metaDescription: 'Elegant Senator-style kaftan for the modern Nigerian gentleman. Premium materials and perfect fit.',
      keywords: ['kaftan', 'senator style', 'nigerian traditional', 'premium wear', 'ready-made']
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'shirt-001',
    name: 'Linen Casual Shirt',
    description: 'Stay cool and stylish in our premium linen shirt. A versatile piece that can be dressed up or down.',
    category: 'casual',
    type: 'ready-made',
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    price: 35000,
    variations: {
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Sky Blue', 'White', 'Beige'],
      materials: ['Linen Blend'],
    },
    details: {
      materialComposition: '55% Linen, 45% Cotton',
      careInstructions: 'Machine wash warm. Tumble dry low.',
      sizingInfo: 'Relaxed fit. Order your usual size.',
    },
    seo: {
      metaTitle: 'Linen Casual Shirt - Premium Comfort Wear',
      metaDescription: 'Breathable linen shirt perfect for casual and semi-formal occasions. Comfortable and stylish.',
      keywords: ['linen shirt', 'casual wear', 'comfortable', 'breathable', 'ready-made']
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'trousers-001',
    name: 'Classic Chino Trousers',
    description: 'The perfect pair of chinos for any occasion. Expertly tailored for a comfortable and flattering fit.',
    category: 'casual',
    type: 'ready-made',
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    price: 40000,
    variations: {
      sizes: ['30W', '32W', '34W', '36W'],
      colors: ['Khaki', 'Navy', 'Black'],
      materials: ['Cotton Twill'],
    },
    details: {
      materialComposition: '98% Cotton, 2% Elastane',
      careInstructions: 'Machine wash cold with like colors.',
      sizingInfo: 'Slim-fit design. Available in various waist sizes.',
    },
    seo: {
      metaTitle: 'Classic Chino Trousers - Versatile Casual Wear',
      metaDescription: 'Expertly tailored chino trousers for any occasion. Comfortable fit with premium cotton twill.',
      keywords: ['chino trousers', 'casual pants', 'versatile', 'comfortable fit', 'ready-made']
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'polo-001',
    name: 'Signature Logo Polo',
    description: 'A timeless polo shirt featuring our subtle gold-stitched logo. A staple for any discerning gentleman\'s wardrobe.',
    category: 'casual',
    type: 'ready-made',
    images: ['https://placehold.co/600x800.png'],
    price: 28000,
    variations: {
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'White', 'Forest Green'],
      materials: ['Pique Cotton'],
    },
    details: {
      materialComposition: '100% Pique Cotton',
      careInstructions: 'Machine wash. Do not bleach. Tumble dry low.',
      sizingInfo: 'Classic fit. Consult the size chart for details.',
    },
    seo: {
      metaTitle: 'Signature Logo Polo - Premium Casual Wear',
      metaDescription: 'Timeless polo shirt with gold-stitched logo. Premium pique cotton for ultimate comfort.',
      keywords: ['polo shirt', 'logo polo', 'casual wear', 'premium cotton', 'ready-made']
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'custom-suit-001',
    name: 'Bespoke Wedding Suit',
    description: 'Create the suit of your dreams for your special day. Our master tailors will guide you through fabric selection and design.',
    category: 'custom',
    type: 'made-to-order',
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    price: 250000,
    variations: {
      sizes: ['Custom'],
      colors: ['Client\'s Choice'],
      materials: ['Italian Wool', 'Velvet', 'Silk Blend'],
    },
    details: {
      materialComposition: 'Based on client selection.',
      careInstructions: 'Varies by fabric. Care instructions provided upon delivery.',
      sizingInfo: 'Fully bespoke. Requires multiple fittings.',
    },
    seo: {
      metaTitle: 'Bespoke Wedding Suit - Custom Tailoring Services',
      metaDescription: 'Create your dream wedding suit with our master tailors. Premium fabrics and perfect fit guaranteed.',
      keywords: ['bespoke suit', 'wedding suit', 'custom tailoring', 'master tailor', 'made-to-order']
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
    {
    id: 'isiagu-001',
    name: 'Modern Isiagu Top',
    description: 'A contemporary interpretation of the traditional Igbo Isiagu top, adorned with the iconic lion head pattern. Perfect for cultural events.',
    category: 'traditional',
    type: 'made-to-order',
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    price: 75000,
    variations: {
      sizes: ['M', 'L', 'XL', 'Custom'],
      colors: ['Black Velvet', 'Red Velvet'],
      materials: ['Velvet'],
    },
    details: {
      materialComposition: 'High-quality velvet with embroidery',
      careInstructions: 'Dry clean only to preserve the embroidery.',
      sizingInfo: 'Can be made to standard sizes or custom measurements.',
    },
    seo: {
      metaTitle: 'Modern Isiagu Top - Traditional Igbo Fashion',
      metaDescription: 'Contemporary Isiagu top with iconic lion head pattern. Perfect for cultural events and celebrations.',
      keywords: ['isiagu', 'igbo traditional', 'lion head pattern', 'cultural wear', 'made-to-order']
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
];


export const orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Tunde Oladipo',
    customerEmail: 'tunde@example.com',
    date: '2023-10-26T10:00:00Z',
    status: 'Delivered',
    total: 120000,
  },
  {
    id: 'ORD-002',
    customerName: 'Amina Bello',
    customerEmail: 'amina@example.com',
    date: '2023-10-25T14:30:00Z',
    status: 'Shipped',
    total: 45000,
  },
  {
    id: 'ORD-003',
    customerName: 'Chinedu Okoro',
    customerEmail: 'chinedu@example.com',
    date: '2023-10-25T09:15:00Z',
    status: 'Processing',
    total: 65000,
  },
  {
    id: 'ORD-004',
    customerName: 'Fatima Aliyu',
    customerEmail: 'fatima@example.com',
    date: '2023-10-24T18:00:00Z',
    status: 'Pending',
    total: 35000,
  },
  {
    id: 'ORD-005',
    customerName: 'Emeka Nwosu',
    customerEmail: 'emeka@example.com',
    date: '2023-10-23T11:45:00Z',
    status: 'Cancelled',
    total: 40000,
  },
];

export const collections: Collection[] = [
  {
    id: 'traditional-wear',
    name: 'Traditional Wear',
    description: 'Exquisite traditional Nigerian attire including Agbada, Dashiki, Kaftan, and Isiagu.',
    products: ['agbada-001', 'dashiki-001', 'kaftan-001', 'isiagu-001'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'casual-wear',
    name: 'Casual Wear',
    description: 'Comfortable and stylish casual wear perfect for everyday use.',
    products: ['shirt-001', 'trousers-001', 'polo-001'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'custom-tailoring',
    name: 'Custom Tailoring',
    description: 'Bespoke tailoring services for the perfect fit and unique designs.',
    products: ['custom-suit-001', 'agbada-001', 'isiagu-001'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const siteSettings: SiteSettings = {
  businessInfo: {
    name: 'Brigg\'s Fashion and Store',
    address: '123 Fashion Street, Lagos, Nigeria',
    phone: '+234 801 234 5678',
    whatsappNumbers: {
      sales: '+234 801 234 5678',
      custom: '+234 802 345 6789',
      support: '+234 803 456 7890',
    },
    businessHours: 'Monday - Saturday: 9:00 AM - 6:00 PM, Sunday: 12:00 PM - 4:00 PM',
  },
  homepage: {
    heroTitle: 'The Essence of Nigerian Elegance',
    heroDescription: 'Experience unparalleled craftsmanship with our exclusive collection of traditional and modern menswear.',
    featuredProducts: ['agbada-001', 'dashiki-001', 'kaftan-001', 'shirt-001'],
  },
};
