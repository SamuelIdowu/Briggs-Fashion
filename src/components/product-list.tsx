'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { ProductModal } from '@/components/product-modal';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { useModal } from '@/hooks/useModal';
import { Grid, List, Search, Filter, ChevronDown } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductListProps {
  initialFilters?: {
    category?: string;
    type?: string;
    search?: string;
  };
  showFilters?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  layout?: 'grid' | 'list';
  className?: string;
}

export function ProductList({
  initialFilters = {},
  showFilters = true,
  showSearch = true,
  showPagination = true,
  layout = 'grid',
  className = '',
}: ProductListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(layout);
  const [searchQuery, setSearchQuery] = useState(initialFilters.search || '');
  const [collections, setCollections] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    types: [],
    ...initialFilters,
  });
  
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal();
  
  const {
    products,
    loading,
    error,
    pagination,
    updateFilters,
    clearFilters,
    goToPage,
  } = useProducts(initialFilters);

  // Fetch collections for category options
  useEffect(() => {
    fetch('/api/collections')
      .then(res => res.json())
      .then(data => {
        console.log('📋 Collections API response:', data);
        if (data.success) {
          setCollections(data.data.collections || []);
          console.log('📋 Collections set:', data.data.collections);
        }
      })
      .catch(error => {
        console.error('Error fetching collections:', error);
      });
  }, []);

  const availableFilters = useMemo(() => {
    // Use collections as categories instead of product categories
    const categories = collections.map(c => c.name);
    const types = [...new Set(products.map(p => p.type).filter(Boolean))] as string[];
    console.log('🔍 Available filters:', { categories, types, collectionsCount: collections.length });
    return { categories, types };
  }, [collections, products]);

  // Ensure consistent rendering between server and client
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    openModal();
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      console.log('🔍 Search query:', query);
      const params = new URLSearchParams(searchParams);
      if (query.trim()) {
        params.set('search', query.trim());
        console.log('🔍 Setting search param:', query.trim());
      } else {
        params.delete('search');
        console.log('🔍 Removing search param');
      }
      params.delete('page'); // Reset to first page when searching
      const newUrl = `/products?${params.toString()}`;
      console.log('🔍 Navigating to:', newUrl);
      router.push(newUrl);
    }, 300), // Reduced from 500ms to 300ms for faster response
    [searchParams, router]
  );

  const handleSearch = (query: string) => {
    console.log('🔍 handleSearch called with:', query);
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters({
      categories: newFilters.categories || [],
      types: newFilters.types || [],
    });
    
    // Convert filter arrays to API format
    const apiFilters: any = { page: 1 };
    
    // If categories are selected, use the first one (or join them)
    if (newFilters.categories && newFilters.categories.length > 0) {
      apiFilters.category = newFilters.categories[0]; // Use first category for now
    }
    
    // If types are selected, use the first one (or join them)
    if (newFilters.types && newFilters.types.length > 0) {
      apiFilters.type = newFilters.types[0]; // Use first type for now
    }
    
    updateFilters(apiFilters);
  };

  const handleClearFilters = () => {
    setActiveFilters({ categories: [], types: [] });
    clearFilters();
  };

  // Simple debounce function
  function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header with Search and View Controls */}
      <div className="mb-6 space-y-4 px-2 sm:px-0">
        {/* Search, Filter, and View Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-1 gap-4 items-center">
          {showSearch && (
            <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      console.log('🔍 Search input changed:', e.target.value);
                      handleSearch(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      console.log('🔍 Search key pressed:', e.key);
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
              </div>
            )}
            
            {showFilters && isClient && (
              <>
                <div className="relative">
                  <select
                    value={activeFilters.categories[0] || ''}
                    onChange={(e) => {
                      const selectedCategory = e.target.value;
                      if (selectedCategory) {
                        handleFilterChange({
                          categories: [selectedCategory],
                          types: activeFilters.types
                        });
                      } else {
                        handleFilterChange({
                          categories: [],
                          types: activeFilters.types
                        });
                      }
                    }}
                    className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    title="Filter by category"
                    aria-label="Filter products by category"
                  >
                    <option value="">All Categories</option>
                    {availableFilters.categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select
                    value={activeFilters.types[0] || ''}
                    onChange={(e) => {
                      const selectedType = e.target.value;
                      if (selectedType) {
                        handleFilterChange({
                          categories: activeFilters.categories,
                          types: [selectedType]
                        });
                      } else {
                        handleFilterChange({
                          categories: activeFilters.categories,
                          types: []
                        });
                      }
                    }}
                    className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    title="Filter by type"
                    aria-label="Filter products by type"
                  >
                    <option value="">All Types</option>
                    {availableFilters.types.map((type) => (
                      <option key={type} value={type}>
                        {type.replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </>
            )}
            
            {/* Clear Filters Button */}
            {isClient && (activeFilters.categories.length > 0 || activeFilters.types.length > 0) && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="text-sm"
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Grid view"
                aria-label="Switch to grid view"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="List view"
                aria-label="Switch to list view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="mb-8">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">
              {searchQuery ? `No products match "${searchQuery}"` : 'No products available'}
            </p>
            {searchQuery && (
              <Button 
                onClick={() => handleSearch('')} 
                variant="outline" 
                className="mt-4"
              >
                Clear search
              </Button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-gray-500 mt-1">No Image</p>
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                  <p className="text-primary font-semibold">{formatPrice(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {showPagination && pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(pagination.page - 1)}
            disabled={!pagination.hasPrevPage}
          >
            Previous
          </Button>
          
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(pagination.page + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next
          </Button>
        </div>
      )}



      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </div>
  );
} 