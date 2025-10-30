import type { Product, Order } from '../types';

export const products: Product[] = [
  {
    id: 'agbada-001',
    name: 'Regal Agbada Ensemble',
    description: 'A masterpiece of tailoring, this Agbada set is perfect for making a grand entrance. It includes the grand boubou, a long-sleeved shirt, and matching trousers.',
    category: 'Traditional Collection',
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
    category: 'Traditional Collection',
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
    category: 'Traditional Collection',
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
    category: 'Casual Collection',
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
    category: 'Casual Collection',
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
    category: 'Casual Collection',
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
    id: 'isiagu-001',
    name: 'Modern Isiagu Top',
    description: 'A contemporary interpretation of the traditional Igbo Isiagu top, adorned with the iconic lion head pattern. Perfect for cultural events.',
    category: 'Traditional Collection',
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
    customerName: 'Fatima Hassan',
    customerEmail: 'fatima@example.com',
    date: '2023-10-24T16:45:00Z',
    status: 'Delivered',
    total: 35000,
  },
  {
    id: 'ORD-005',
    customerName: 'Kemi Adebayo',
    customerEmail: 'kemi@example.com',
    date: '2023-10-24T11:20:00Z',
    status: 'Shipped',
    total: 28000,
  },
];

export const collections = [
  {
    id: 'traditional-collection',
    name: 'Traditional Collection',
    description: 'Our finest traditional Nigerian wear, perfect for special occasions and cultural events.',
    products: ['agbada-001', 'dashiki-001', 'kaftan-001', 'isiagu-001'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'casual-collection',
    name: 'Casual Collection',
    description: 'Comfortable and stylish casual wear for everyday use.',
    products: ['shirt-001', 'trousers-001', 'polo-001'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
];

export const siteSettings = {
  businessInfo: {
    name: "Brigg's Fashion and Store",
    email: "info@briggsfashion.com",
    phone: "+234 801 234 5678",
    address: "123 Fashion Street, Victoria Island, Lagos, Nigeria",
    whatsappNumbers: ["+234 801 234 5678", "+234 802 345 6789"]
  },
  homepage: {
    hero: {
      title: "Elevate Your Style",
      subtitle: "Discover our curated collection of premium Nigerian fashion",
      description: "From traditional Agbada to modern casual wear, we offer the finest quality garments tailored to perfection."
    },
    featuredSection: {
      title: "Featured Products",
      subtitle: "Handpicked pieces from our collection"
    }
  },
  seo: {
    metaTitle: "Brigg's Fashion and Store - Premium Nigerian Fashion",
    metaDescription: "Discover premium Nigerian fashion at Brigg's Fashion and Store. Traditional Agbada, modern casual wear, and custom tailoring services.",
    keywords: ["nigerian fashion", "agbada", "traditional wear", "casual wear", "custom tailoring", "premium fashion"]
  },
  social: {
    facebook: "https://facebook.com/briggsfashion",
    instagram: "https://instagram.com/briggsfashion",
    twitter: "https://twitter.com/briggsfashion",
    whatsapp: "https://wa.me/2348012345678"
  }
};
