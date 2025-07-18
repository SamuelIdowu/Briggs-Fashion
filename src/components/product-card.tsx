import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            data-ai-hint="nigerian fashion"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
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
    </Link>
  );
}
