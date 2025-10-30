'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductService, ProductFilters, ProductResponse } from '../services/productService';
import type { Product } from '../types';

export function useProducts(initialFilters: ProductFilters = {}) {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<ProductResponse['pagination'] | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  // Get current filters from URL params
  const getCurrentFilters = useCallback((): ProductFilters => {
    const currentFilters: ProductFilters = {
      page: parseInt(searchParams.get('page') || '1', 10),
      limit: parseInt(searchParams.get('limit') || '12', 10),
    };

    // Add search parameter
    const search = searchParams.get('search') || searchParams.get('q');
    if (search) {
      currentFilters.search = search;
    }

    // Add category parameter
    const category = searchParams.get('category');
    if (category) {
      currentFilters.category = category;
    }

    // Add type parameter
    const type = searchParams.get('type');
    if (type) {
      currentFilters.type = type;
    }

    return currentFilters;
  }, [searchParams]);

  const fetchProducts = useCallback(async (newFilters: ProductFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentFilters = { ...filters, ...newFilters };
      const response = await ProductService.getProducts(currentFilters);
      
      setProducts(response.products);
      setPagination(response.pagination);
      setFilters(currentFilters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch products when URL params change
  useEffect(() => {
    const currentFilters = getCurrentFilters();
    console.log('🔍 useProducts - URL params changed, fetching with filters:', currentFilters);
    fetchProducts(currentFilters);
  }, [searchParams, getCurrentFilters, fetchProducts]);

  const searchProducts = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const results = await ProductService.searchProducts(query);
      setProducts(results);
      setPagination(null); // Search results don't have pagination
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search products');
    } finally {
      setLoading(false);
    }
  }, []);

  const getProduct = useCallback(async (id: string): Promise<Product | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const product = await ProductService.getProduct(id);
      return product;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductsByCategory = useCallback(async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const results = await ProductService.getProductsByCategory(category);
      setProducts(results);
      setPagination(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products by category');
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductsByType = useCallback(async (type: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const results = await ProductService.getProductsByType(type);
      setProducts(results);
      setPagination(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products by type');
    } finally {
      setLoading(false);
    }
  }, []);

  const getFeaturedProducts = useCallback(async (limit: number = 4) => {
    try {
      setLoading(true);
      setError(null);
      
      const results = await ProductService.getFeaturedProducts(limit);
      setProducts(results);
      setPagination(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch featured products');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    console.log('🔧 updateFilters called with:', newFilters);
    fetchProducts(newFilters);
  }, [fetchProducts]);

  const clearFilters = useCallback(() => {
    const clearedFilters: ProductFilters = {
      page: 1,
      limit: 12,
    };
    fetchProducts(clearedFilters);
  }, [fetchProducts]);

  const goToPage = useCallback((page: number) => {
    if (page < 1) return;
    fetchProducts({ ...filters, page });
  }, [fetchProducts, filters]);

  return {
    products,
    loading,
    error,
    pagination,
    searchProducts,
    getProduct,
    getProductsByCategory,
    getProductsByType,
    getFeaturedProducts,
    updateFilters,
    clearFilters,
    goToPage,
  };
} 