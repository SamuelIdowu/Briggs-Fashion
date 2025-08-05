'use client';

import { Suspense } from 'react';
import { ProductList } from '@/components/product-list';

interface ProductListWrapperProps {
  initialFilters?: {
    category?: string;
    type?: string;
    search?: string;
  };
  showFilters?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  layout?: 'grid' | 'list';
}

export function ProductListWrapper(props: ProductListWrapperProps) {
  return (
    <Suspense>
      <ProductList {...props} />
    </Suspense>
  );
} 