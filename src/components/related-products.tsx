import { getRelatedProductRecommendations } from "@/ai/flows/related-product-recommendations";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types";
import { products as allProducts } from "@/lib/data";

interface RelatedProductsProps {
  currentProduct: Product;
}

export async function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  try {
    const recommendations = await getRelatedProductRecommendations({
      productName: currentProduct.name,
      productDescription: currentProduct.description,
      productCategory: currentProduct.category,
      productType: currentProduct.type,
    });
    
    const recommendedProductNames = recommendations.relatedProducts.map(p => p.name.toLowerCase());
    
    // Find actual products from our data that match the recommendations
    const relatedProducts = allProducts
      .filter(p => p.id !== currentProduct.id && recommendedProductNames.includes(p.name.toLowerCase()))
      .slice(0, 4); // Limit to 4 recommendations

    if (relatedProducts.length === 0) {
      return null;
    }

    return (
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-center font-headline">You Might Also Like</h2>
        <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 lg:gap-x-8">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to get related products:", error);
    return null; // Don't render anything if the AI call fails
  }
}
