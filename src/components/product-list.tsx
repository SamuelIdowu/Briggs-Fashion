'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/product-card';
import { ProductModal } from '@/components/product-modal';
import { SearchBar } from '@/components/search-bar';
import { FilterSidebar } from '@/components/filter-sidebar';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    openModal();
  };

  const handleSearch = (query: string) => {
    updateFilters({ search: query, page: 1 });
  };

  const handleFilterChange = (filters: any) => {
    updateFilters({ ...filters, page: 1 });
  };

  const handleClearFilters = () => {
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
              <SearchBar onSearch={handleSearch} />
            </div>
          )}
          
          <div className="flex items-center gap-2">
            {/* Filter Toggle for Mobile */}
            {showFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilterSidebar(true)}
                className="sm:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            )}
            
            {/* View Mode Toggle */}
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {pagination ? `${pagination.total} products found` : `${products.length} products`}
          </span>
          {showFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-xs"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Filter Sidebar */}
      {showFilters && (
        <FilterSidebar
          isOpen={showFilterSidebar}
          onClose={() => setShowFilterSidebar(false)}
          onFilterChange={handleFilterChange}
        />
      )}

      {/* Products Grid/List */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No products found</p>
          <Button onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
                layout={viewMode}
              />
            ))}
          </div>

          {/* Pagination */}
          {showPagination && pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={goToPage}
                hasNextPage={pagination.hasNextPage}
                hasPrevPage={pagination.hasPrevPage}
              />
            </div>
          )}
        </>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
} 