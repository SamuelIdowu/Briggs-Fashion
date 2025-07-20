import type { Product } from '@/types';

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

export interface ProductResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
  filters: ProductFilters;
}

export class ProductService {
  private static baseUrl = '/api';

  static async getProducts(filters: ProductFilters = {}): Promise<ProductResponse> {
    const params = new URLSearchParams();
    
    // Add filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await fetch(`${this.baseUrl}/products?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return response.json();
  }

  static async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Product not found');
    }
    
    const data = await response.json();
    return data.product;
  }

  static async searchProducts(query: string): Promise<Product[]> {
    const response = await this.getProducts({ search: query });
    return response.products;
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await this.getProducts({ category });
    return response.products;
  }

  static async getProductsByType(type: string): Promise<Product[]> {
    const response = await this.getProducts({ type });
    return response.products;
  }

  static async getFeaturedProducts(limit: number = 4): Promise<Product[]> {
    const response = await this.getProducts({ limit });
    return response.products.slice(0, limit);
  }
} 