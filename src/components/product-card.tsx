import Image from "next/image";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <button onClick={onClick} className="group block w-full text-left">
      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              data-ai-hint="nigerian fashion"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500">No Image</p>
              </div>
            </div>
          )}
           {product.type === 'made-to-order' && (
            <Badge variant="default" className="absolute top-2 right-2 bg-primary text-primary-foreground">
              Made to Order
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="truncate font-semibold text-lg">{product.name}</h3>
          <p className="text-muted-foreground text-sm capitalize">{product.category}</p>
          <p className="mt-2 text-xl font-bold text-foreground">{formatPrice(product.price)}</p>
        </div>
      </div>
    </button>
  );
}
