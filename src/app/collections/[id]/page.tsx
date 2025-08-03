'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import { StructuredData } from '@/components/structured-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/utils';
import type { Collection } from '@/types';

interface CollectionPageProps {
  params: {
    id: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/collections/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Collection not found');
        }
        
        const data = await response.json();
        setCollection(data.collection);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch collection');
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [params.id]);

  if (loading) {
    return (
      <div className="bg-background text-foreground">
        {/* Hero Section Skeleton */}
        <section className="relative h-[30vh] min-h-[250px] w-full bg-gray-200">
          <div className="container mx-auto flex h-full flex-col items-center justify-center text-center">
            <Skeleton className="h-12 w-96 mb-4" />
            <Skeleton className="h-6 w-80" />
          </div>
        </section>

        {/* Content Skeleton */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80" />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="bg-background text-foreground">
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Collection Not Found</h1>
            <p className="text-muted-foreground mb-8">
              {error || 'The collection you are looking for does not exist.'}
            </p>
            <a
              href="/products"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Browse All Products
            </a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[250px] w-full bg-black/40 text-white">
        <div className="container mx-auto flex h-full flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white">
              Collection
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white">
              {collection.products.length} Products
            </Badge>
          </div>
          <h1 className="text-4xl font-bold md:text-6xl drop-shadow-lg">{collection.name}</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Collection Info */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Collection Details</span>
                <Badge variant={collection.isActive ? 'default' : 'secondary'}>
                  {collection.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </CardTitle>
              <CardDescription>
                Created on {formatDate(collection.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{collection.description}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProductList 
            initialFilters={{}}
            showFilters={true}
            showSearch={true}
            showPagination={true}
            layout="grid"
          />
        </div>
      </section>

      {/* Structured Data */}
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": collection.name,
          "description": collection.description,
          "url": `https://briggsfashion.com/collections/${collection.id}`,
        }} 
      />
    </div>
  );
} 