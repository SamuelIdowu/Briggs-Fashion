'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { ProductModal } from '@/components/product-modal';
import { products } from '@/lib/data';
import type { Product } from '@/types';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const featuredProducts = products.slice(0, 4);
  const collections = [
    { name: 'Traditional Wear', href: '/products?category=traditional', image: 'https://placehold.co/600x400.png', hint: 'traditional clothing' },
    { name: 'Casual Wear', href: '/products?category=casual', image: 'https://placehold.co/600x400.png', hint: 'casual fashion' },
    { name: 'Custom Tailoring', href: '/products?category=custom', image: 'https://placehold.co/600x400.png', hint: 'tailor measuring' },
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
      <section className="relative h-[60vh] min-h-[400px] w-full bg-black/40 text-white">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Elegant traditional Nigerian attire"
          data-ai-hint="nigerian fashion men"
          fill
          className="object-cover -z-10"
          priority
        />
        <div className="container mx-auto flex h-full flex-col items-center justify-center text-center">
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center font-headline">Our Collections</h2>
          <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 lg:gap-x-8">
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
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => handleProductClick(product)}
              />
            ))}
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
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
