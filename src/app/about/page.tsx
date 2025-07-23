'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full bg-black/40 text-white">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Brigg's Fashion and Store workshop"
          data-ai-hint="tailor workshop"
          fill
          className="object-cover -z-10"
          priority
        />
        <div className="container mx-auto flex h-full flex-col items-center justify-center text-center">
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
                  Founded in 1995, Brigg's Fashion and Store has been at the forefront of Nigerian fashion, 
                  blending traditional craftsmanship with contemporary design. Our journey began 
                  with a simple vision: to create clothing that celebrates Nigerian culture while 
                  meeting the demands of modern life.
                </p>
                <p>
                  What started as a small tailoring shop in Lagos has grown into one of Nigeria's 
                  most respected fashion houses. Our master tailors, many of whom have been with 
                  us for over two decades, bring their expertise and passion to every garment we create.
                </p>
                <p>
                  We believe that clothing is more than just fabric and thread—it's a statement of 
                  identity, culture, and personal style. That's why we offer both ready-made pieces 
                  for immediate satisfaction and custom tailoring services for those seeking the 
                  perfect fit and unique design.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://placehold.co/600x800.png"
                alt="Traditional Nigerian fashion"
                width={600}
                height={800}
                className="rounded-lg shadow-lg"
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
                  incorporating traditional patterns and styles into contemporary fashion.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👤</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Personal Service</h3>
                <p className="text-muted-foreground">
                  We believe in building lasting relationships with our customers, providing 
                  personalized service and expert guidance for every purchase.
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
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="default">Ready-Made</Badge>
                  <h3 className="text-xl font-semibold">Off-the-Rack Collection</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Our ready-made collection offers immediate satisfaction with carefully crafted 
                  pieces available in standard sizes. Perfect for those who need quality clothing 
                  without the wait.
                </p>
                <Button asChild>
                  <Link href="/products?type=ready-made">Shop Ready-Made</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary">Custom</Badge>
                  <h3 className="text-xl font-semibold">Bespoke Tailoring</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Experience the luxury of custom tailoring with our master tailors. From initial 
                  consultation to final fitting, we ensure the perfect fit and unique design.
                </p>
                <Button asChild variant="outline">
                  <Link href="/products?type=made-to-order">Custom Tailoring</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Experience Excellence?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover our collection of traditional and modern menswear, or schedule a consultation 
            for custom tailoring services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/products">Shop Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
