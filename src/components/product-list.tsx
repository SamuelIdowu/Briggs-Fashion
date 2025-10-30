'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { ProductCard } from './product-card';
import { ProductModal } from './product-modal';
import { FilterSidebar } from './filter-sidebar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useModal } from '../hooks/useModal';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types';
import { Search, Grid3X3, List, X, Filter } from 'lucide-react';

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

function ProductListContent({
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
    const fetchCollections = async () => {
      try {
        console.log('📋 Fetching collections...');
        const res = await fetch('/api/collections');
        const data = await res.json();
        console.log('📋 Collections API response:', data);
        
        if (data.success && data.data && data.data.collections) {
          setCollections(data.data.collections);
          console.log('📋 Collections set:', data.data.collections);
        } else {
          console.warn('📋 Collections API returned no data or error:', data);
          // Fallback: Use static test collections if API fails
          const testCollections = [
            { name: 'Suits', _id: 'suits' },
            { name: 'Shirts', _id: 'shirts' },
            { name: 'Accessories', _id: 'accessories' }
          ];
          setCollections(testCollections);
          console.log('📋 Fallback: Using test collections:', testCollections);
        }
      } catch (error) {
        console.error('❌ Error fetching collections:', error);
        // Fallback: Use static test collections if API fails
        const testCollections = [
          { name: 'Suits', _id: 'suits' },
          { name: 'Shirts', _id: 'shirts' },
          { name: 'Accessories', _id: 'accessories' }
        ];
        setCollections(testCollections);
        console.log('📋 Fallback: Using test collections:', testCollections);
      }
    };
    
    fetchCollections();
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
      } else {
        params.delete('search');
      }
      router.push(`/products?${params.toString()}`);
    }, 500),
    [searchParams, router]
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleFilterChange = (newFilters: any) => {
    console.log('🔍 Filter change:', newFilters);
    const params = new URLSearchParams(searchParams);
    
    // Handle categories array
    if (newFilters.categories && newFilters.categories.length > 0) {
      // For now, only use the first category for URL (API limitation)
      params.set('category', newFilters.categories[0]);
    } else {
      params.delete('category');
    }
    
    // Handle types array
    if (newFilters.types && newFilters.types.length > 0) {
      // For now, only use the first type for URL (API limitation)
      params.set('type', newFilters.types[0]);
    } else {
      params.delete('type');
    }
    
    // Handle single category/type for backward compatibility
    if (newFilters.category) {
      params.set('category', newFilters.category);
    }
    if (newFilters.type) {
      params.set('type', newFilters.type);
    }
    
    router.push(`/products?${params.toString()}`);
    setActiveFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    router.push('/products');
    setActiveFilters({ categories: [], types: [] });
  };

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

  // Loading state
  if (loading && !isClient) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Error loading products. Please try again.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          {showSearch && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
          
          {showFilters && (
            <>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFilters.categories.length > 0 || activeFilters.types.length > 0 ? (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                    {activeFilters.categories.length + activeFilters.types.length}
                  </Badge>
                ) : null}
              </Button>
              <FilterSidebar
                filters={availableFilters}
                selectedFilters={activeFilters}
                onFilterChange={handleFilterChange}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(activeFilters.categories.length > 0 || activeFilters.types.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.categories.map((category: any) => (
            <Badge key={category} variant="secondary" className="gap-1">
              {category}
              <button
                onClick={() => handleFilterChange({ category: undefined })}
                className="ml-1 hover:text-destructive"
                aria-label={`Remove ${category} filter`}
                title={`Remove ${category} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {activeFilters.types.map((type: any) => (
            <Badge key={type} variant="secondary" className="gap-1">
              {type}
              <button
                onClick={() => handleFilterChange({ type: undefined })}
                className="ml-1 hover:text-destructive"
                aria-label={`Remove ${type} filter`}
                title={`Remove ${type} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-6 px-2 text-xs"
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      )}

      {/* Pagination */}
      {showPagination && pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </Button>
          
          <span className="flex items-center px-3 text-sm">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
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

export function ProductList(props: ProductListProps) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <ProductListContent {...props} />
    </Suspense>
  );
} 