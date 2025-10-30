'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import Link from 'next/link';

export function AboutContent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = ['/inspo1.jpg', '/inspo2.jpg', '/inspo3.jpg'];

  // Simple image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full text-white">
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
          <h1 className="text-4xl font-bold md:text-6xl drop-shadow-lg">Our Story</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
            Crafting excellence in Nigerian fashion since 1995
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">The Essence of Nigerian Elegance</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 1995, Brigg&apos;s Fashion and Store has been at the forefront of Nigerian fashion, 
                  blending traditional craftsmanship with contemporary design. Our journey began 
                  with a simple vision: to create clothing that celebrates Nigerian culture while 
                  meeting the demands of modern life.
                </p>
                <p>
                  What started as a small tailoring shop in Lagos has grown into one of Nigeria&apos;s 
                  most respected fashion houses. Our master tailors, many of whom have been with 
                  us for over two decades, bring their expertise and passion to every garment we create.
                </p>
                <p>
                  We believe that clothing is more than just fabric and thread—it&apos;s a statement of 
                  identity, culture, and personal style. That&apos;s why we offer both ready-made pieces 
                  for immediate satisfaction and custom tailoring services for those seeking the 
                  perfect fit and unique design.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/inspo2.jpg"
                alt="Traditional Nigerian fashion"
                width={600}
                height={800}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Every garment is crafted with attention to detail, using the finest materials 
                  and traditional techniques passed down through generations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Cultural Heritage</h3>
                <p className="text-muted-foreground">
                  We celebrate and preserve Nigerian cultural heritage through our designs, 
                  incorporating traditional patterns and styles into modern fashion.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
                <p className="text-muted-foreground">
                  We prioritize our customers' satisfaction, offering personalized service 
                  and ensuring every piece meets their expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="default">Ready-Made</Badge>
                  <h3 className="text-xl font-semibold">Ready-Made Collection</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Browse our curated selection of ready-made pieces, from traditional agbada 
                  and dashiki to modern suits and casual wear. Each piece is crafted with 
                  the same attention to detail as our custom work.
                </p>
                <Button asChild>
                  <Link href="/products">Shop Collection</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary">Custom</Badge>
                  <h3 className="text-xl font-semibold">Custom Tailoring</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Experience the art of custom tailoring with our master craftsmen. From 
                  initial consultation to final fitting, we ensure every detail meets your 
                  specifications and style preferences.
                </p>
                <Button asChild variant="outline">
                  <Link href="/contact">Book Consultation</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍💼</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Chief Brigg</h3>
                <p className="text-sm text-muted-foreground mb-2">Founder & Master Tailor</p>
                <p className="text-sm text-muted-foreground">
                  With over 30 years of experience, Chief Brigg leads our team with 
                  unparalleled expertise in traditional Nigerian fashion.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍🎨</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Master Ade</h3>
                <p className="text-sm text-muted-foreground mb-2">Head Designer</p>
                <p className="text-sm text-muted-foreground">
                  Master Ade brings contemporary flair to traditional designs, creating 
                  pieces that bridge the gap between heritage and modernity.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍🔧</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Tailor Musa</h3>
                <p className="text-sm text-muted-foreground mb-2">Senior Craftsman</p>
                <p className="text-sm text-muted-foreground">
                  With 25 years of experience, Tailor Musa specializes in intricate 
                  embroidery and traditional pattern work.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Experience Nigerian Excellence</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking for ready-made pieces or custom tailoring, 
            we're here to help you achieve the perfect look that celebrates your heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/products">Shop Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 