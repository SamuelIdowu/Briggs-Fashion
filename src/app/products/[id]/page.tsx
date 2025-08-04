import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { formatPrice } from "@/lib/utils";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) notFound();
  const { product } = await res.json();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">{product.name}</h1>
              <Badge variant="outline" className="text-base capitalize">{product.category}</Badge>
            </div>
            <p className="mt-2 text-3xl font-bold">{formatPrice(product.price)}</p>
          </div>
          
          <p className="text-lg text-muted-foreground">{product.description}</p>
          
          <div className="space-y-4">
            <WhatsAppButton 
              message={{
                type: 'ready-made',
                productName: product.name
              }}
            >
              Inquire on WhatsApp
            </WhatsAppButton>
            <p className="text-center text-sm text-muted-foreground">Have questions? Inquire on WhatsApp for a personal consultation.</p>
          </div>

          <Separator />
          
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li><strong>Material:</strong> {product.details.materialComposition}</li>
                  <li><strong>Sizing:</strong> {product.details.sizingInfo}</li>
                  <li><strong>Care:</strong> {product.details.careInstructions}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">Available Variations</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li><strong>Sizes:</strong> {product.variations.sizes.join(', ')}</li>
                  <li><strong>Colors:</strong> {product.variations.colors.join(', ')}</li>
                  <li><strong>Materials:</strong> {product.variations.materials.join(', ')}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

// Note: generateStaticParams removed as it references undefined 'products' variable
