'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdmin } from '@/hooks/useAdmin';
import { Save, Building2, Home, Phone } from 'lucide-react';

interface SiteSettings {
  businessInfo: {
    name: string;
    address: string;
    phone: string;
    whatsappNumbers: {
      sales: string;
      custom: string;
      support: string;
    };
    businessHours: string;
  };
  homepage: {
    heroTitle: string;
    heroDescription: string;
    featuredProducts: string[];
  };
}

export default function AdminSettingsPage() {
  const { updateSiteSettings, loading, error, clearError } = useAdmin();
  const [settings, setSettings] = useState<SiteSettings>({
    businessInfo: {
      name: '',
      address: '',
      phone: '',
      whatsappNumbers: {
        sales: '',
        custom: '',
        support: '',
      },
      businessHours: '',
    },
    homepage: {
      heroTitle: '',
      heroDescription: '',
      featuredProducts: [],
    },
  });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Load current settings
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/admin/settings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleSave = async () => {
    const success = await updateSiteSettings(settings);
    if (success) {
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const updateBusinessInfo = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        [field]: value,
      },
    }));
  };

  const updateWhatsAppNumber = (type: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        whatsappNumbers: {
          ...prev.businessInfo.whatsappNumbers,
          [type]: value,
        },
      },
    }));
  };

  const updateHomepage = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      homepage: {
        ...prev.homepage,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Site Settings</h1>
          <p className="text-muted-foreground">
            Manage your website settings and business information
          </p>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Success Alert */}
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            {error}
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto ml-2"
              onClick={clearError}
            >
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Business Info
          </TabsTrigger>
          <TabsTrigger value="homepage" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Homepage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your business details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={settings.businessInfo.name}
                    onChange={(e) => updateBusinessInfo('name', e.target.value)}
                    placeholder="Briggs Fashion"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.businessInfo.phone}
                    onChange={(e) => updateBusinessInfo('phone', e.target.value)}
                    placeholder="+234 123 456 7890"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={settings.businessInfo.address}
                  onChange={(e) => updateBusinessInfo('address', e.target.value)}
                  placeholder="123 Fashion Street, Lagos, Nigeria"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessHours">Business Hours</Label>
                <Input
                  id="businessHours"
                  value={settings.businessInfo.businessHours}
                  onChange={(e) => updateBusinessInfo('businessHours', e.target.value)}
                  placeholder="Monday - Friday: 9AM - 6PM, Saturday: 10AM - 4PM"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                WhatsApp Numbers
              </CardTitle>
              <CardDescription>
                Configure different WhatsApp numbers for different purposes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsappSales">Sales</Label>
                  <Input
                    id="whatsappSales"
                    value={settings.businessInfo.whatsappNumbers.sales}
                    onChange={(e) => updateWhatsAppNumber('sales', e.target.value)}
                    placeholder="+234 123 456 7890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsappCustom">Custom Orders</Label>
                  <Input
                    id="whatsappCustom"
                    value={settings.businessInfo.whatsappNumbers.custom}
                    onChange={(e) => updateWhatsAppNumber('custom', e.target.value)}
                    placeholder="+234 123 456 7891"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsappSupport">Support</Label>
                  <Input
                    id="whatsappSupport"
                    value={settings.businessInfo.whatsappNumbers.support}
                    onChange={(e) => updateWhatsAppNumber('support', e.target.value)}
                    placeholder="+234 123 456 7892"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homepage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Content</CardTitle>
              <CardDescription>
                Customize your homepage hero section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input
                  id="heroTitle"
                  value={settings.homepage.heroTitle}
                  onChange={(e) => updateHomepage('heroTitle', e.target.value)}
                  placeholder="Elegant Nigerian Fashion"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heroDescription">Hero Description</Label>
                <Textarea
                  id="heroDescription"
                  value={settings.homepage.heroDescription}
                  onChange={(e) => updateHomepage('heroDescription', e.target.value)}
                  placeholder="Discover our collection of traditional and modern Nigerian fashion for the discerning gentleman."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 