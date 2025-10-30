'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/auth-context';
import type { Product, Collection, SiteSettings } from '../types';

interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  productViews: number;
  whatsappInquiries: number;
  monthlyRevenue: number;
  activeProducts: number;
}

interface AdminData {
  stats: AdminStats;
  recentOrders: any[];
  popularProducts: any[];
}

export function useAdmin() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is admin
  const isAdmin = isAuthenticated && user?.role === 'admin';

  // Create new product
  const createProduct = useCallback(async (productData: Partial<Product>): Promise<boolean> => {
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create product';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  // Update product
  const updateProduct = useCallback(async (id: string, productData: Partial<Product>): Promise<boolean> => {
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update product';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  // Delete product
  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete product';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  // Create collection
  const createCollection = useCallback(async (collectionData: Partial<Collection>): Promise<boolean> => {
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/admin/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(collectionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create collection');
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create collection';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  // Update site settings
  const updateSiteSettings = useCallback(async (settings: Partial<SiteSettings>): Promise<boolean> => {
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update site settings');
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update site settings';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  // Upload image
  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('image', file);

      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload image');
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload image';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isAdmin,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    createCollection,
    updateSiteSettings,
    uploadImage,
    clearError,
  };
} 