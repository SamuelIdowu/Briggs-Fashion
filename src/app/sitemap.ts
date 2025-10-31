import { MetadataRoute } from 'next';
import dbConnect from '../lib/database';
import Product from '../models/Product';
import Collection from '../models/Collection';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const connection = await dbConnect();
  
  let products: any[] = [];
  let collections: any[] = [];
  
  if (connection) {
    try {
      products = await Product.find().lean();
      collections = await Collection.find().lean();
    } catch (error) {
      console.error('Error fetching data for sitemap:', error);
      // Continue with empty arrays - static pages will still be included
    }
  }

  const baseUrl = 'https://briggsfashion.com';

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/size-guide`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  // Product pages
  const productPages = products.map((product: any) => ({
    url: `${baseUrl}/products/${product._id}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Collection pages
  const collectionPages = collections.map((collection: any) => ({
    url: `${baseUrl}/collections/${collection._id}`,
    lastModified: new Date(collection.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...collectionPages];
} 