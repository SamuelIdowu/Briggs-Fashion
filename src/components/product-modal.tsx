'use client';

import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ImageCarousel } from '@/components/image-carousel';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { formatPrice, getCategoryDisplayName, getTypeDisplayName } from '@/utils/helpers';
import { createProductInquiry } from '@/utils/whatsappUtils';
import { Product } from '@/types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!product) return null;

  const handleWhatsAppInquiry = () => {
    const message = createProductInquiry(
      product.name,
      product.type,
      selectedSize || undefined,
      selectedColor || undefined
    );
    
    // The WhatsAppButton component will handle the actual sending
    return message;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Carousel */}
            <div className="h-96 lg:h-full">
              <ImageCarousel
                images={product.images}
                alt={product.name}
                className="h-full"
                showArrows={true}
                showDots={true}
              />
            </div>

            {/* Product Information */}
            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {getCategoryDisplayName(product.category)}
                  </Badge>
                  <Badge variant="outline">
                    {getTypeDisplayName(product.type)}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
                <p className="text-3xl font-bold text-primary mt-2">
                  {formatPrice(product.price)}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Size Selection */}
              {product.variations.sizes.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className="min-w-[60px]"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.variations.colors.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Material</h3>
                  <p className="text-sm text-muted-foreground">{product.details.materialComposition}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Care Instructions</h3>
                  <p className="text-sm text-muted-foreground">{product.details.careInstructions}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Sizing Information</h3>
                  <p className="text-sm text-muted-foreground">{product.details.sizingInfo}</p>
                </div>
              </div>

              <Separator />

              {/* WhatsApp Inquiry Button */}
              <WhatsAppButton
                message={handleWhatsAppInquiry()}
                className="w-full"
                size="lg"
              >
                Inquire on WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 