"use client";

import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface WhatsAppButtonProps {
  product: Product;
  selectedSize?: string;
  selectedColor?: string;
}

export function WhatsAppButton({ product, selectedSize, selectedColor }: WhatsAppButtonProps) {
  const businessNumber = "2348012345678"; // Replace with actual business number

  const generateMessage = () => {
    let message = `Hello! I'm interested in the "${product.name}".`;
    if (selectedSize) message += `\nSize: ${selectedSize}`;
    if (selectedColor) message += `\nColor: ${selectedColor}`;
    
    if (product.type === 'made-to-order') {
        message = `Hello! I'd like to discuss custom tailoring for the "${product.name}".`;
    }
    
    const productUrl = typeof window !== 'undefined' ? window.location.href : '';
    message += `\n\nProduct Link: ${productUrl}`;
    return message;
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${businessNumber}?text=${encodeURIComponent(generateMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button onClick={openWhatsApp} size="lg" className="w-full bg-primary text-primary-foreground">
      <Icons.whatsapp className="mr-2 h-5 w-5 fill-current" />
      Inquire on WhatsApp
    </Button>
  );
}
