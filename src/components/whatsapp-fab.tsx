'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import { createGeneralInquiry, getBusinessHoursStatus } from '@/utils/whatsappUtils';
import { WHATSAPP_NUMBERS } from '@/utils/constants';

export function WhatsAppFAB() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [businessStatus, setBusinessStatus] = useState(getBusinessHoursStatus());
  const { sendGeneralInquiry } = useWhatsApp();

  // Update business status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setBusinessStatus(getBusinessHoursStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleGeneralInquiry = async () => {
    try {
      await sendGeneralInquiry();
      setIsExpanded(false);
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
    }
  };

  const handleSalesInquiry = async () => {
    try {
      await sendGeneralInquiry('Hello! I\'m interested in your ready-made products. Can you help me?');
      setIsExpanded(false);
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
    }
  };

  const handleCustomInquiry = async () => {
    try {
      await sendGeneralInquiry('Hello! I\'d like to discuss custom tailoring services. Can we schedule a consultation?');
      setIsExpanded(false);
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Expanded Card */}
      {isExpanded && (
        <Card className="mb-4 w-80 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Contact Us</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Business Status */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${businessStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm font-medium">
                  {businessStatus.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {businessStatus.message}
              </p>
            </div>

            {/* Contact Options */}
            <div className="space-y-2">
              <Button
                onClick={handleGeneralInquiry}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                General Inquiry
              </Button>
              
              <Button
                onClick={handleSalesInquiry}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Ready-Made Products
              </Button>
              
              <Button
                onClick={handleCustomInquiry}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Custom Tailoring
              </Button>
            </div>

            {/* Phone Numbers */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground mb-2">Direct Contact:</p>
              <div className="space-y-1">
                <p className="text-xs">
                  <span className="font-medium">Sales:</span> {WHATSAPP_NUMBERS.sales}
                </p>
                <p className="text-xs">
                  <span className="font-medium">Custom:</span> {WHATSAPP_NUMBERS.custom}
                </p>
                <p className="text-xs">
                  <span className="font-medium">Support:</span> {WHATSAPP_NUMBERS.support}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Action Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size="icon"
        className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
