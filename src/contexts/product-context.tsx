'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product, ProductFilters } from '../types';

interface ProductContextType {
  // Featured products
  featuredProducts: Product[];
  loadingFeatured: boolean;
  
  // New arrivals
  newArrivals: Product[];
  loadingNewArrivals: boolean;
  
  // Collections
  collections: any[];
  loadingCollections: boolean;
  
  // Search and filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  
  // Product actions
  getProduct: (id: string) => Promise<Product | null>;
  getProductsByCategory: (category: string) => Promise<void>;
  getProductsByType: (type: string) => Promise<void>;
  
  // Refresh functions
  refreshFeaturedProducts: () => void;
  refreshNewArrivals: () => void;
  refreshCollections: () => void;
}

interface ProductProviderProps {
  children: ReactNode;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: ProductProviderProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFilters>({});
  
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
  const [loadingCollections, setLoadingCollections] = useState(true);

  // Load featured products
  const loadFeaturedProducts = async () => {
    try {
      setLoadingFeatured(true);
      const response = await fetch('/api/products?isFeatured=true&limit=4');
      if (response.ok) {
        const data = await response.json();
        setFeaturedProducts(data.products);
      }
    } catch (error) {
      console.error('Failed to load featured products:', error);
    } finally {
      setLoadingFeatured(false);
    }
  };

  // Load new arrivals
  const loadNewArrivals = async () => {
    try {
      setLoadingNewArrivals(true);
      // Get products sorted by creation date, limit to 6
      const response = await fetch('/api/products?sort=createdAt&order=desc&limit=6');
      if (response.ok) {
        const data = await response.json();
        setNewArrivals(data.products);
      }
    } catch (error) {
      console.error('Failed to load new arrivals:', error);
    } finally {
      setLoadingNewArrivals(false);
    }
  };

  // Load collections
  const loadCollections = async () => {
    try {
      setLoadingCollections(true);
      const response = await fetch('/api/collections?isActive=true');
      if (response.ok) {
        const data = await response.json();
        setCollections(data.collections);
      }
    } catch (error) {
      console.error('Failed to load collections:', error);
    } finally {
      setLoadingCollections(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadFeaturedProducts();
    loadNewArrivals();
    loadCollections();
  }, []);

  // Refresh functions
  const refreshFeaturedProducts = () => {
    loadFeaturedProducts();
  };

  const refreshNewArrivals = () => {
    loadNewArrivals();
  };

  const refreshCollections = () => {
    loadCollections();
  };

  // Placeholder functions for product actions
  const getProduct = async (id: string): Promise<Product | null> => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        return data.product;
      }
      return null;
    } catch (error) {
      console.error('Failed to get product:', error);
      return null;
    }
  };

  const getProductsByCategory = async (category: string) => {
    // This function is not used in the context, but kept for interface compatibility
    console.log('getProductsByCategory called with:', category);
  };

  const getProductsByType = async (type: string) => {
    // This function is not used in the context, but kept for interface compatibility
    console.log('getProductsByType called with:', type);
  };

  const value: ProductContextType = {
    featuredProducts,
    loadingFeatured,
    newArrivals,
    loadingNewArrivals,
    collections,
    loadingCollections,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    getProduct,
    getProductsByCategory,
    getProductsByType,
    refreshFeaturedProducts,
    refreshNewArrivals,
    refreshCollections,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
} 