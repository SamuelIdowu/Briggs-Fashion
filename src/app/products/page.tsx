"use client";

import { useSearchParams } from "next/navigation";
import { ProductList } from "@/components/product-list";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialType = searchParams.get("type") || "";
  
  const initialFilters = {
    category: initialCategory || undefined,
    type: initialType || undefined,
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[250px] w-full bg-black/40 text-white">
        <div className="container mx-auto flex h-full flex-col items-center justify-center text-center">
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
            showFilters={true}
            showSearch={true}
            showPagination={true}
            layout="grid"
          />
        </div>
      </section>
    </div>
  );
}
