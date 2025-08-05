'use client';

import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MessageCircle, Ruler, Users } from 'lucide-react';
import Link from 'next/link';
import { siteSettings } from '@/lib/data';

// Minimal Tabs implementation
function Tabs({ tabs, defaultTab, children, className = '' }: {
  tabs: { value: string; label: string }[];
  defaultTab: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(defaultTab);
  return (
    <div className={className}>
      <div className="flex border-b mb-6">
        {tabs.map(tab => (
          <button
            key={tab.value}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${active === tab.value ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-primary'}`}
            onClick={() => setActive(tab.value)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      {Array.isArray(children)
        ? children.filter((child: any) => child.props.value === active)
        : null}
    </div>
  );
}

function TabPanel({ value, children }: { value: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}

function SizeGuideContent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = ['/inspo4.jpg', '/inspo5.jpg', '/inspo6.jpg'];

  // Simple image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleWhatsAppClick = () => {
    const message = "Hello! I need help with sizing for your products. Can you assist me?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = siteSettings.businessInfo.whatsappNumbers[0]; // Use first number as support
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

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
          <h1 className="text-4xl font-bold md:text-6xl drop-shadow-lg">Size Guide</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
            Find your perfect fit with our comprehensive sizing guide
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">How to Find Your Size</h2>
              <p className="text-muted-foreground text-lg">
                We offer both ready-made sizes and custom tailoring. Use our size guide to find 
                your perfect fit, or contact us for custom measurements.
              </p>
            </div>

            {/* Size Guide Tabs */}
            <Tabs tabs={[
              { value: 'ready-made', label: 'Ready-Made Sizes' },
              { value: 'custom', label: 'Custom Measurements' },
              { value: 'tips', label: 'Sizing Tips' }
            ]} defaultTab="ready-made" className="mb-8">

              <TabPanel value="ready-made">
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Ruler className="h-5 w-5" />
                        Ready-Made Size Chart
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Size</TableHead>
                              <TableHead>Chest (inches)</TableHead>
                              <TableHead>Waist (inches)</TableHead>
                              <TableHead>Hip (inches)</TableHead>
                              <TableHead>Length (inches)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">S</TableCell>
                              <TableCell>36-38</TableCell>
                              <TableCell>30-32</TableCell>
                              <TableCell>38-40</TableCell>
                              <TableCell>28-30</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">M</TableCell>
                              <TableCell>38-40</TableCell>
                              <TableCell>32-34</TableCell>
                              <TableCell>40-42</TableCell>
                              <TableCell>30-32</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">L</TableCell>
                              <TableCell>40-42</TableCell>
                              <TableCell>34-36</TableCell>
                              <TableCell>42-44</TableCell>
                              <TableCell>32-34</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">XL</TableCell>
                              <TableCell>42-44</TableCell>
                              <TableCell>36-38</TableCell>
                              <TableCell>44-46</TableCell>
                              <TableCell>34-36</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">XXL</TableCell>
                              <TableCell>44-46</TableCell>
                              <TableCell>38-40</TableCell>
                              <TableCell>46-48</TableCell>
                              <TableCell>36-38</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>How to Measure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Chest</h4>
                          <p className="text-sm text-muted-foreground">
                            Measure around the fullest part of your chest, keeping the tape horizontal.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Waist</h4>
                          <p className="text-sm text-muted-foreground">
                            Measure around your natural waistline, keeping the tape comfortably loose.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Hip</h4>
                          <p className="text-sm text-muted-foreground">
                            Measure around the fullest part of your hips, keeping the tape horizontal.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Length</h4>
                          <p className="text-sm text-muted-foreground">
                            Measure from the top of your shoulder to your desired length.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabPanel>

              <TabPanel value="custom">
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Custom Tailoring Measurements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6">
                        For custom tailoring, we take detailed measurements to ensure a perfect fit. 
                        Our master tailors will guide you through the process and create a garment 
                        that fits your unique body shape and style preferences.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">What We Measure</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Neck circumference</li>
                            <li>• Shoulder width</li>
                            <li>• Chest circumference</li>
                            <li>• Waist circumference</li>
                            <li>• Hip circumference</li>
                            <li>• Arm length</li>
                            <li>• Leg length</li>
                            <li>• Height and weight</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Custom Fitting Process</h4>
                          <ol className="space-y-2 text-sm text-muted-foreground">
                            <li>1. Initial consultation and style discussion</li>
                            <li>2. Detailed measurements taken</li>
                            <li>3. Fabric selection and design approval</li>
                            <li>4. First fitting and adjustments</li>
                            <li>5. Final fitting and delivery</li>
                          </ol>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Book a Custom Fitting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Ready for a custom piece? Contact us to schedule a fitting appointment 
                        with our master tailors.
                      </p>
                      <Button onClick={handleWhatsAppClick} className="bg-green-600 hover:bg-green-700">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Schedule Custom Fitting
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabPanel>

              <TabPanel value="tips">
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sizing Tips & Best Practices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-2">Getting Accurate Measurements</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Use a flexible measuring tape</li>
                            <li>• Measure over light clothing or bare skin</li>
                            <li>• Keep the tape snug but not tight</li>
                            <li>• Stand naturally with arms relaxed</li>
                            <li>• Have someone else measure you for accuracy</li>
                          </ul>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="font-semibold mb-2">Choosing the Right Size</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• If between sizes, choose the larger size</li>
                            <li>• Consider the garment's intended fit (slim, regular, loose)</li>
                            <li>• Account for layering if you plan to wear undergarments</li>
                            <li>• Remember that different styles may fit differently</li>
                          </ul>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="font-semibold mb-2">When to Choose Custom</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• If you're between standard sizes</li>
                            <li>• For special occasions or formal events</li>
                            <li>• If you have specific style preferences</li>
                            <li>• For unique body proportions</li>
                            <li>• When you want a truly personalized garment</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Unsure about your size or need assistance with measurements? 
                        Our team is here to help you find the perfect fit.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={handleWhatsAppClick} className="bg-green-600 hover:bg-green-700">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Get Sizing Help
                        </Button>
                        <Button asChild variant="outline">
                          <Link href="/contact">Contact Us</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SizeGuidePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <SizeGuideContent />
    </Suspense>
  );
}
