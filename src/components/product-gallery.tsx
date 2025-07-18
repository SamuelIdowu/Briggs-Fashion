"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      <div className="flex sm:flex-col gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={cn(
              "relative aspect-square h-20 w-20 overflow-hidden rounded-md transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              selectedImage === image && "ring-2 ring-primary ring-offset-2"
            )}
          >
            <Image
              src={image}
              alt={`${productName} - view ${index + 1}`}
              data-ai-hint="fashion photoshoot"
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
      <div className="relative aspect-[3/4] w-full flex-1 overflow-hidden rounded-lg">
        <Image
          src={selectedImage}
          alt={productName}
          data-ai-hint="man wearing clothes"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
