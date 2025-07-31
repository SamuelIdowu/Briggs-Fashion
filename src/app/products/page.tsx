"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductList } from "@/components/product-list";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const initialFilters = {
    category: initialCategory || undefined,
    search: initialSearch || undefined,
  };

  const heroImages = ['/inspo4.jpg', '/inspo1.jpg', '/inspo2.jpg'];

  // Simple image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[250px] w-full text-white">
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
        <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold md:text-6xl drop-shadow-lg">Our Collection</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
            Browse our curated selection of fine menswear, crafted with passion and precision.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProductList 
            initialFilters={initialFilters}
            showFilters={false}
            showSearch={true}
            showPagination={true}
            layout="grid"
          />
        </div>
      </section>
    </div>
  );
}
