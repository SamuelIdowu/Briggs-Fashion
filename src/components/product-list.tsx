'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/product-card';
import { ProductModal } from '@/components/product-modal';
import { FilterSidebar } from '@/components/filter-sidebar';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { useModal } from '@/hooks/useModal';
import { Filter, Grid, List } from 'lucide-react';
import type { Product } from '@/types';

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(layout);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
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

  const availableFilters = useMemo(() => {
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))] as string[];
    const types = [...new Set(products.map(p => p.type).filter(Boolean))] as string[];
    return { categories, types };
  }, [products]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    openModal();
  };

  const handleSearch = (query: string) => {
    updateFilters({ search: query, page: 1 });
  };

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters({
      categories: newFilters.categories || [],
      types: newFilters.types || [],
    });
    updateFilters({ ...newFilters, page: 1 });
  };

  const handleClearFilters = () => {
    setActiveFilters({ categories: [], types: [] });
    clearFilters();
  };

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
      {/* Header with Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search and View Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {showSearch && (
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          )}
          
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
              >
                <List size={18} />
              </button>
            </div>

            {/* Filter Toggle */}
            {showFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilterSidebar(true)}
                className="flex items-center gap-2"
              >
                <Filter size={16} />
                Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="mb-8">
        {viewMode === 'grid' ? (
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
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                  <p className="text-primary font-semibold">₦{product.price.toLocaleString()}</p>
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

      {/* Filter Sidebar */}
      {showFilters && (
        <FilterSidebar
          isOpen={showFilterSidebar}
          onClose={() => setShowFilterSidebar(false)}
          filters={availableFilters}
          selectedFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />
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