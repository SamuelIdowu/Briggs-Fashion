import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  category: 'traditional' | 'casual';
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
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  category: {
    type: String,
    enum: ['traditional', 'casual'],
    required: [true, 'Product category is required'],
  },
  type: {
    type: String,
    enum: ['ready-made', 'made-to-order'],
    required: [true, 'Product type is required'],
  },
  images: [{
    type: String,
    required: [true, 'At least one product image is required'],
  }],
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  variations: {
    sizes: [{
      type: String,
      trim: true,
    }],
    colors: [{
      type: String,
      trim: true,
    }],
    materials: [{
      type: String,
      trim: true,
    }],
  },
  details: {
    materialComposition: {
      type: String,
      default: '',
    },
    careInstructions: {
      type: String,
      default: '',
    },
    sizingInfo: {
      type: String,
      default: '',
    },
  },
  seo: {
    metaTitle: {
      type: String,
      default: function(this: IProduct) {
        return this.name;
      },
    },
    metaDescription: {
      type: String,
      default: function(this: IProduct) {
        return this.description.substring(0, 160);
      },
    },
    keywords: [{
      type: String,
      trim: true,
    }],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Index for search functionality
productSchema.index({
  name: 'text',
  description: 'text',
  'seo.keywords': 'text',
});

// Index for filtering
productSchema.index({ category: 1, type: 1, isActive: 1, isFeatured: 1 });

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(this.price / 100);
});

// Ensure virtuals are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema); 