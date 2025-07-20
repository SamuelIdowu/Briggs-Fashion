'use client';

import Script from 'next/script';
import type { Product } from '@/types';

interface StructuredDataProps {
  type: 'product' | 'organization' | 'website';
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const generateStructuredData = () => {
    switch (type) {
      case 'product':
        return generateProductSchema(data);
      case 'organization':
        return generateOrganizationSchema(data);
      case 'website':
        return generateWebsiteSchema(data);
      default:
        return null;
    }
  };

  const structuredData = generateStructuredData();
  
  if (!structuredData) return null;

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Briggs Fashion',
    },
    category: getCategoryDisplayName(product.category),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'NGN',
      availability: product.type === 'ready-made' 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: 'Briggs Fashion',
        url: 'https://briggsfashion.com',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Type',
        value: getTypeDisplayName(product.type),
      },
      {
        '@type': 'PropertyValue',
        name: 'Material',
        value: product.details.materialComposition,
      },
      {
        '@type': 'PropertyValue',
        name: 'Care Instructions',
        value: product.details.careInstructions,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '156',
    },
  };
}

function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Briggs Fashion',
    url: 'https://briggsfashion.com',
    logo: 'https://briggsfashion.com/logo.png',
    description: 'Premium Nigerian menswear specializing in traditional and modern fashion with custom tailoring services.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Fashion Street',
      addressLocality: 'Lagos',
      addressCountry: 'NG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-801-234-5678',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://facebook.com/briggsfashion',
      'https://instagram.com/briggsfashion',
      'https://twitter.com/briggsfashion',
    ],
  };
}

function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Briggs Fashion',
    url: 'https://briggsfashion.com',
    description: 'Premium Nigerian menswear - Traditional and modern fashion with custom tailoring services.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://briggsfashion.com/products?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Helper functions
function getCategoryDisplayName(category: string): string {
  const categoryMap: Record<string, string> = {
    traditional: 'Traditional Wear',
    casual: 'Casual Wear',
    custom: 'Custom Tailoring',
  };
  return categoryMap[category] || category;
}

function getTypeDisplayName(type: string): string {
  const typeMap: Record<string, string> = {
    'ready-made': 'Ready-Made',
    'made-to-order': 'Made to Order',
  };
  return typeMap[type] || type;
} 