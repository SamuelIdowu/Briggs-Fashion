'use client';

import Script from 'next/script';

interface AnalyticsProps {
  gaId?: string;
}

export function Analytics({ gaId }: AnalyticsProps) {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Track page views
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
}

// Track custom events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Track product views
export function trackProductView(productId: string, productName: string) {
  trackEvent('view_item', 'engagement', productName);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'NGN',
      value: 0, // We don't have price in this context
      items: [
        {
          item_id: productId,
          item_name: productName,
        },
      ],
    });
  }
}

// Track WhatsApp inquiries
export function trackWhatsAppInquiry(type: string, productName?: string) {
  trackEvent('whatsapp_inquiry', 'engagement', type, 1);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_inquiry', {
      event_category: 'engagement',
      event_label: type,
      value: 1,
      custom_parameter: productName,
    });
  }
}

// Track search queries
export function trackSearch(searchTerm: string, resultsCount: number) {
  trackEvent('search', 'engagement', searchTerm, resultsCount);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  }
}

// Track filter usage
export function trackFilterUsage(filterType: string, filterValue: string) {
  trackEvent('filter_used', 'engagement', `${filterType}: ${filterValue}`);
}

// Track collection views
export function trackCollectionView(collectionName: string) {
  trackEvent('view_item_list', 'engagement', collectionName);
}

// Track add to cart (for future e-commerce features)
export function trackAddToCart(productId: string, productName: string, price: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'NGN',
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price: price,
          currency: 'NGN',
        },
      ],
    });
  }
}

// Track purchase (for future e-commerce features)
export function trackPurchase(
  transactionId: string,
  value: number,
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'NGN',
      items: items.map(item => ({
        ...item,
        currency: 'NGN',
      })),
    });
  }
} 