'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Ruler, Users } from 'lucide-react';
import Link from 'next/link';
import { siteSettings } from '@/lib/data';

export default function SizeGuidePage() {
  const handleWhatsAppClick = () => {
    const message = "Hello! I need help with sizing for your products. Can you assist me?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${siteSettings.businessInfo.whatsappNumbers.support.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full bg-black/40 text-white">
        <div className="container mx-auto flex h-full flex-col items-center justify-center text-center">
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
            <Tabs defaultValue="ready-made" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ready-made">Ready-Made Sizes</TabsTrigger>
                <TabsTrigger value="custom">Custom Measurements</TabsTrigger>
              </TabsList>

              <TabsContent value="ready-made" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Standard Size Chart
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Shirts & Tops</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Size</TableHead>
                              <TableHead>Chest (inches)</TableHead>
                              <TableHead>Waist (inches)</TableHead>
                              <TableHead>Shoulder (inches)</TableHead>
                              <TableHead>Sleeve (inches)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">S</TableCell>
                              <TableCell>36-38</TableCell>
                              <TableCell>30-32</TableCell>
                              <TableCell>16-17</TableCell>
                              <TableCell>24-25</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">M</TableCell>
                              <TableCell>38-40</TableCell>
                              <TableCell>32-34</TableCell>
                              <TableCell>17-18</TableCell>
                              <TableCell>25-26</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">L</TableCell>
                              <TableCell>40-42</TableCell>
                              <TableCell>34-36</TableCell>
                              <TableCell>18-19</TableCell>
                              <TableCell>26-27</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">XL</TableCell>
                              <TableCell>42-44</TableCell>
                              <TableCell>36-38</TableCell>
                              <TableCell>19-20</TableCell>
                              <TableCell>27-28</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">XXL</TableCell>
                              <TableCell>44-46</TableCell>
                              <TableCell>38-40</TableCell>
                              <TableCell>20-21</TableCell>
                              <TableCell>28-29</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-semibold mb-3">Trousers & Pants</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Size</TableHead>
                              <TableHead>Waist (inches)</TableHead>
                              <TableHead>Hip (inches)</TableHead>
                              <TableHead>Inseam (inches)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">30W</TableCell>
                              <TableCell>30-31</TableCell>
                              <TableCell>38-39</TableCell>
                              <TableCell>32</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">32W</TableCell>
                              <TableCell>32-33</TableCell>
                              <TableCell>40-41</TableCell>
                              <TableCell>32</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">34W</TableCell>
                              <TableCell>34-35</TableCell>
                              <TableCell>42-43</TableCell>
                              <TableCell>32</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">36W</TableCell>
                              <TableCell>36-37</TableCell>
                              <TableCell>44-45</TableCell>
                              <TableCell>32</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      <div className="bg-secondary p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">📏 How to Measure</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li><strong>Chest:</strong> Measure around the fullest part of your chest</li>
                          <li><strong>Waist:</strong> Measure around your natural waistline</li>
                          <li><strong>Shoulder:</strong> Measure from shoulder tip to shoulder tip</li>
                          <li><strong>Sleeve:</strong> Measure from shoulder to desired sleeve length</li>
                          <li><strong>Hip:</strong> Measure around the fullest part of your hips</li>
                          <li><strong>Inseam:</strong> Measure from crotch to desired pant length</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="custom" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ruler className="h-5 w-5" />
                      Custom Tailoring Measurements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <p className="text-muted-foreground mb-4">
                          For custom tailoring, we take comprehensive measurements to ensure the perfect fit. 
                          Our master tailors will guide you through the entire process.
                        </p>
                        
                        <h3 className="font-semibold mb-3">Required Measurements for Custom Pieces</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">Upper Body</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Neck circumference</li>
                              <li>• Shoulder width</li>
                              <li>• Chest circumference</li>
                              <li>• Waist circumference</li>
                              <li>• Arm length</li>
                              <li>• Wrist circumference</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">Lower Body</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Hip circumference</li>
                              <li>• Thigh circumference</li>
                              <li>• Knee circumference</li>
                              <li>• Calf circumference</li>
                              <li>• Ankle circumference</li>
                              <li>• Inseam length</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">🎯 Custom Tailoring Process</h4>
                        <ol className="text-sm text-muted-foreground space-y-2">
                          <li><strong>1. Consultation:</strong> Discuss your design preferences and requirements</li>
                          <li><strong>2. Measurements:</strong> Professional measurement session with our tailors</li>
                          <li><strong>3. Fabric Selection:</strong> Choose from our premium fabric collection</li>
                          <li><strong>4. Fitting:</strong> Multiple fittings to ensure perfect fit</li>
                          <li><strong>5. Delivery:</strong> Final delivery with care instructions</li>
                        </ol>
                      </div>

                      <div className="text-center">
                        <Button 
                          onClick={handleWhatsAppClick}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Schedule Custom Fitting
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Tips Section */}
            <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Size Guide Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">For Ready-Made Items</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Measure yourself while wearing light clothing</li>
                        <li>• Use a flexible measuring tape</li>
                        <li>• Don't pull the tape too tight</li>
                        <li>• If between sizes, choose the larger size</li>
                        <li>• Consider your preferred fit (slim, regular, loose)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">For Custom Tailoring</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Schedule a professional fitting session</li>
                        <li>• Bring shoes you'll wear with the outfit</li>
                        <li>• Consider seasonal variations in fit</li>
                        <li>• Discuss any specific requirements</li>
                        <li>• Allow time for multiple fittings</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="mt-12 text-center">
              <div className="bg-secondary p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Need Help with Sizing?</h3>
                <p className="text-muted-foreground mb-6">
                  Our team is here to help you find the perfect fit. Contact us for personalized assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Support
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
