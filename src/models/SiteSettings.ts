import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteSettings extends Document {
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
    featuredProducts: mongoose.Types.ObjectId[];
  };
  seo: {
    siteTitle: string;
    siteDescription: string;
    siteKeywords: string[];
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    whatsapp?: string;
  };
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<ISiteSettings>({
  businessInfo: {
    name: {
      type: String,
      required: [true, 'Business name is required'],
      default: 'Brigg\'s Fashion and Store',
    },
    address: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    whatsappNumbers: {
      sales: {
        type: String,
        default: '',
      },
      custom: {
        type: String,
        default: '',
      },
      support: {
        type: String,
        default: '',
      },
    },
    businessHours: {
      type: String,
      default: 'Monday - Friday: 9AM - 6PM, Saturday: 10AM - 4PM',
    },
  },
  homepage: {
    heroTitle: {
      type: String,
      default: 'Elegant Nigerian Fashion',
    },
    heroDescription: {
      type: String,
      default: 'Discover our collection of traditional and modern Nigerian fashion for the discerning gentleman.',
    },
    featuredProducts: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }],
  },
  seo: {
    siteTitle: {
      type: String,
      default: 'Brigg\'s Fashion and Store - Nigerian Fashion E-commerce',
    },
    siteDescription: {
      type: String,
      default: 'Premium Nigerian fashion for men. Traditional and modern wear with custom tailoring services.',
    },
    siteKeywords: [{
      type: String,
      trim: true,
    }],
  },
  social: {
    facebook: String,
    instagram: String,
    twitter: String,
    whatsapp: String,
  },
}, {
  timestamps: true,
});

// Ensure only one settings document exists
siteSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  
  if (!settings) {
    settings = await this.create({});
  }
  
  return settings;
};

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema); 