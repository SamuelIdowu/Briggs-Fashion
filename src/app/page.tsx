'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { ProductModal } from '@/components/product-modal';
import type { Product } from '@/types';

function HomeContent() {
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
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                      <p className="text-lg opacity-90">Explore Collection</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-center font-headline mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight font-headline mb-6">Crafting Excellence Since 1995</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Brigg&apos;s Fashion and Store has been at the forefront of Nigerian fashion, 
                  blending traditional craftsmanship with contemporary design. Our journey began 
                  with a simple vision: to create clothing that celebrates Nigerian culture while 
                  meeting the demands of modern life.
                </p>
                <p>
                  What started as a small tailoring shop in Lagos has grown into one of Nigeria&apos;s 
                  most respected fashion houses. Our master tailors, many of whom have been with 
                  us for over two decades, bring their expertise and passion to every garment we create.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/inspo2.jpg"
                alt="Traditional Nigerian fashion"
                width={600}
                height={800}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
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

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
