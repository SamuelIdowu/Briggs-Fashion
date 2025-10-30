'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MessageCircle, Phone, MapPin, Clock, Mail } from 'lucide-react';
import { siteSettings } from '@/lib/data';

export function ContactForm() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const heroImages = ['/inspo5.jpg', '/inspo6.jpg', '/inspo7.jpg'];

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simple image rotation
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length, isClient]);

  const handleWhatsAppClick = (number: string, type: string) => {
    // Add null check for number
    if (!number) {
      console.error('WhatsApp number is undefined');
      return;
    }
    
    const message = `Hello! I'd like to inquire about ${type} services at Brigg's Fashion and Store.`;
    const encodedMessage = encodeURIComponent(message);
    const cleanNumber = number.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneClick = (number: string) => {
    if (!number) {
      console.error('Phone number is undefined');
      return;
    }
    window.open(`tel:${number}`, '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@briggsfashion.com', '_self');
  };

  // Get WhatsApp numbers from the array
  const whatsappNumbers = siteSettings.businessInfo.whatsappNumbers;
  const salesNumber = whatsappNumbers[0] || '+234 801 234 5678';
  const customNumber = whatsappNumbers[1] || '+234 802 345 6789';
  const supportNumber = whatsappNumbers[0] || '+234 801 234 5678'; // Use sales number as fallback

  // Don't render anything until we're on the client side
  if (!isClient) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full text-white">
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
          <h1 className="text-4xl font-bold md:text-6xl drop-shadow-lg">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
            Get in touch with our team for personalized service and expert guidance
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
               <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Get in Touch</h2>
                <p className="text-muted-foreground text-lg">
                  We're here to help you find the perfect fit and style. Reach out to us through 
                  any of the channels below for personalized assistance.
                </p>
               </div>

              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 6:00 PM, Sunday: 12:00 PM - 4:00 PM</p>
                </CardContent>
              </Card>

              {/* Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Visit Our Workshop
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{siteSettings.businessInfo.address}</p>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-muted-foreground hover:text-foreground"
                    onClick={() => handlePhoneClick(siteSettings.businessInfo.phone)}
                  >
                    {siteSettings.businessInfo.phone}
                  </Button>
                </CardContent>
              </Card>

              {/* Email */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-muted-foreground hover:text-foreground"
                    onClick={handleEmailClick}
                  >
                    info@briggsfashion.com
                  </Button>
                </CardContent>
              </Card>
          </div>

            {/* WhatsApp Contact Options */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">WhatsApp Services</h3>
                <p className="text-muted-foreground mb-6">
                  Connect with us on WhatsApp for quick responses and personalized service. 
                  We have dedicated numbers for different services.
                </p>
              </div>

              {/* Sales WhatsApp */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="default" className="bg-green-600">Sales</Badge>
                        <h4 className="font-semibold">Ready-Made Products</h4>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        Inquire about our ready-made collection, check availability, 
                        and get quick answers about sizes and colors.
                      </p>
                      <p className="text-sm font-medium">{salesNumber}</p>
                    </div>
                    <Button
                      onClick={() => handleWhatsAppClick(salesNumber, 'sales')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Custom Tailoring WhatsApp */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">Custom</Badge>
                        <h4 className="font-semibold">Custom Tailoring</h4>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        Schedule consultations, discuss custom designs, and get expert 
                        advice from our master tailors.
                      </p>
                      <p className="text-sm font-medium">{customNumber}</p>
                    </div>
                    <Button
                      onClick={() => handleWhatsAppClick(customNumber, 'custom tailoring')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Support WhatsApp */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Support</Badge>
                        <h4 className="font-semibold">Customer Support</h4>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        Get help with orders, sizing questions, care instructions, 
                        and any other customer service needs.
                      </p>
                      <p className="text-sm font-medium">{supportNumber}</p>
                    </div>
                    <Button
                      onClick={() => handleWhatsAppClick(supportNumber, 'customer support')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
                </div>
              </div>
            </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">How long does custom tailoring take?</h3>
                <p className="text-muted-foreground text-sm">
                  Custom tailoring typically takes 2-4 weeks depending on complexity. 
                  We'll provide a specific timeline during consultation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you offer alterations?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer alteration services for both ready-made and custom pieces. 
                  Contact us for pricing and availability.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept cash, bank transfers, and mobile money payments. 
                  Payment plans are available for custom orders.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you ship outside Lagos?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer nationwide shipping. Shipping costs and delivery times 
                  vary by location.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking for ready-made pieces or custom tailoring, 
            we're here to help you achieve the perfect look.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => handleWhatsAppClick(salesNumber, 'general inquiry')}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Start WhatsApp Chat
            </Button>
        </div>
      </div>
      </section>
    </div>
  );
} 