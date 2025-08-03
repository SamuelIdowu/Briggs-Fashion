export interface Product {
  _id?: string;
  id: string;
  name: string;
  description: string;
  category: string;
  type: 'ready-made' | 'made-to-order';
  images: string[]; // 2-4 images per product
  price: number;
  variations: {
    sizes: string[];
    colors: string[];
    materials: string[];
  };
  details: {
    materialComposition: string;
    careInstructions: string;
    sizingInfo: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string; // ISO date string
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  products: string[]; // product IDs
  isActive: boolean;
  createdAt: string;
}

export interface SiteSettings {
  businessInfo: {
    name: string;
    address: string;
    phone: string;
    whatsappNumbers: {
      sales: string;
      custom: string;
      support: string;
    };
    businessHours: string;
  };
  homepage: {
    heroTitle: string;
    heroDescription: string;
    featuredProducts: string[];
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'customer';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  type?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  material?: string;
  page?: number;
  limit?: number;
}
