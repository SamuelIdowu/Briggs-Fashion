'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { WhatsAppButton } from './whatsapp-button';
import { formatPrice, getCategoryDisplayName, getTypeDisplayName } from '../utils/helpers';
import { createProductInquiry } from '../utils/whatsappUtils';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null;

  const handleWhatsAppInquiry = () => {
    const message = createProductInquiry(
      product.name,
      product.type
    );
    return message;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">
          Product Details - {product.name}
        </DialogTitle>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Single Product Image */}
            <div className="h-80 md:h-full flex items-center justify-center bg-gray-100">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="object-contain h-full w-full rounded"
                />
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}
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