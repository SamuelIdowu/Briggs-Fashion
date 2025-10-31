import { notFound } from 'next/navigation';
import { ProductListWrapper } from '../../../components/product-list-wrapper';
import { StructuredData } from '../../../components/structured-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { formatDate } from '../../../lib/utils';
import type { Collection } from '../../../types';

interface CollectionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { id } = await params;
  
  // Fetch collection data server-side
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/collections/${id}`, { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    notFound();
  }
  
  const { collection } = await res.json();

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
          <ProductListWrapper 
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