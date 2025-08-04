'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { ProductModal } from '@/components/product-modal';
import type { Product } from '@/types';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = ['/inspo3.jpg', '/inspo4.jpg', '/inspo5.jpg'];

  // Simple image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    fetch('/api/products?limit=4')
      .then(res => res.json())
      .then(data => {
        if (data.products && Array.isArray(data.products)) {
          setFeaturedProducts(data.products);
        } else {
          console.error('Invalid products data:', data);
          setFeaturedProducts([]);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setFeaturedProducts([]);
      });
  }, []);

  const collections = [
    { name: 'Traditional Collection', href: '/products?category=Traditional Collection', image: '/inspo1.jpg', hint: 'traditional clothing' },
    { name: 'Casual Collection', href: '/products?category=Casual Collection', image: '/inspo2.jpg', hint: 'casual fashion' },
  ];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url(${heroImages[currentImageIndex]})`,
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center text-center px-6 sm:px-8">
          <h1 className="text-4xl font-bold md:text-6xl drop-shadow-lg font-headline">The Essence of Nigerian Elegance</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
            Experience unparalleled craftsmanship with our exclusive collection of traditional and modern menswear.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-center font-headline">Our Collections</h2>
          <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:gap-x-8">
            {collections.map((collection) => (
              <Link key={collection.name} href={collection.href} className="group block">
                <div className="relative h-96 w-full overflow-hidden rounded-lg">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    data-ai-hint={collection.hint}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                     <h3 className="text-2xl font-semibold text-white drop-shadow-md">{collection.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center font-headline">Featured Products</h2>
          <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 lg:gap-x-8">
            {featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={() => handleProductClick(product)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No featured products available at the moment.</p>
              </div>
            )}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        product={selectedProduct}
      />
    </div>
  );
}
