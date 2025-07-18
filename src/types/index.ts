export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'traditional' | 'casual' | 'custom';
  type: 'ready-made' | 'made-to-order';
  images: string[];
  price: number;
  variations: {
    sizes: string[];
    colors: string[];
    materials: string[];
  };
  details: {
    materialComposition: string;
    careInstructions: string;
    sizingInfo: string;
  }
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string; // ISO date string
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
}
