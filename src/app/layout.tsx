import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/contexts/auth-context';
import { ProductProvider } from '@/contexts/product-context';

export const metadata: Metadata = {
  title: 'Brigg\'s Fashion and Store - Premium Nigerian Menswear',
  description: 'Experience unparalleled craftsmanship with our exclusive collection of traditional and modern menswear. Custom tailoring and ready-made pieces.',
  keywords: ['nigerian fashion', 'menswear', 'traditional wear', 'custom tailoring', 'african fashion', 'agbada', 'dashiki', 'kaftan'],
  authors: [{ name: 'Brigg\'s Fashion and Store' }],
  creator: 'Brigg\'s Fashion and Store',
  publisher: 'Brigg\'s Fashion and Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://briggsfashion.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Brigg\'s Fashion and Store - Premium Nigerian Menswear',
    description: 'Experience unparalleled craftsmanship with our exclusive collection of traditional and modern menswear.',
    url: 'https://briggsfashion.com',
    siteName: 'Brigg\'s Fashion and Store',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brigg\'s Fashion and Store - Premium Nigerian Menswear',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brigg\'s Fashion and Store - Premium Nigerian Menswear',
    description: 'Experience unparalleled craftsmanship with our exclusive collection of traditional and modern menswear.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <ProductProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
