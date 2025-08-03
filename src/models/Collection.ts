import mongoose, { Document, Schema } from 'mongoose';

export interface ICollection extends Document {
  name: string;
  description: string;
  products: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const collectionSchema = new Schema<ICollection>({
  name: {
    type: String,
    required: [true, 'Collection name is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Index for filtering
collectionSchema.index({ isActive: 1 });

// Virtual for product count - this will be overridden by API logic
collectionSchema.virtual('productCount').get(function() {
  return this.products.length;
});

// Ensure virtuals are serialized
collectionSchema.set('toJSON', { virtuals: true });
collectionSchema.set('toObject', { virtuals: true });

export default mongoose.models.Collection || mongoose.model<ICollection>('Collection', collectionSchema); 