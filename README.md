# Briggs Fashion - Nigerian Fashion E-commerce Platform

A modern, efficient e-commerce platform for Nigerian fashion retailer specializing in men's traditional and casual wear, offering both custom tailoring and ready-made items with WhatsApp-based customer communication.

## 🚀 Features

- **Product Catalog**: Unlimited product listings with comprehensive information
- **WhatsApp Integration**: Direct customer communication with pre-populated messages
- **Admin Panel**: Complete content management system
- **Responsive Design**: Mobile-first design with gold and black theme
- **SEO Optimized**: Meta tags, structured data, and sitemap generation
- **Analytics**: Google Analytics 4 integration
- **Performance**: Optimized for fast loading and Core Web Vitals

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Backend**: Node.js with Express.js (API Routes)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Context API
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+
- MongoDB Atlas account (for production)
- Vercel account (for deployment)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Briggs-Fashion
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
cp env.example .env.local
```

Update `.env.local` with your configuration:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/briggs-fashion
MONGODB_URI_PROD=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/briggs-fashion

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Briggs Fashion
NEXT_PUBLIC_WHATSAPP_SALES=+2341234567890
```

### 4. Database Setup

#### Option A: Local MongoDB

```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Option B: MongoDB Atlas

1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Update `MONGODB_URI_PROD` in `.env.local`

### 5. Seed Database

```bash
npm run seed
```

This will create:

- Admin user (admin@briggsfashion.com / admin123)
- Sample products
- Collections
- Site settings

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── admin/             # Admin pages
│   └── (app)/             # Public pages
├── components/            # Reusable components
│   ├── ui/               # Radix UI components
│   └── admin/            # Admin components
├── models/               # MongoDB models
├── hooks/                # Custom React hooks
├── contexts/             # React contexts
├── services/             # API services
├── utils/                # Utility functions
└── types/                # TypeScript types
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript check
- `npm run seed` - Seed database with sample data
- `npm run docker:compose` - Run with Docker Compose
- `npm run vercel:deploy` - Deploy to Vercel

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel
   ```

3. **Set Environment Variables:**
   - Go to Vercel dashboard
   - Add all variables from `.env.local`

### Docker

```bash
# Build and run
docker-compose up --build

# Or manually
docker build -t briggs-fashion .
docker run -p 3000:3000 --env-file .env.local briggs-fashion
```

### Manual Server

```bash
npm run build
npm start
```

## 🔐 Admin Access

Default admin credentials:

- **Email**: admin@briggsfashion.com
- **Password**: admin123

**Important**: Change these credentials immediately after first login.

## 📱 WhatsApp Integration

The platform integrates WhatsApp for customer communication:

- **Product Inquiry**: Pre-populated messages with product details
- **Floating Action Button**: General inquiries
- **Multiple Numbers**: Sales, custom orders, customer service

Configure WhatsApp numbers in environment variables:

```env
NEXT_PUBLIC_WHATSAPP_SALES=+2341234567890
NEXT_PUBLIC_WHATSAPP_CUSTOM=+2341234567891
NEXT_PUBLIC_WHATSAPP_SUPPORT=+2341234567892
```

## 🎨 Customization

### Theme Colors

The platform uses a gold and black theme. Update colors in:

- `tailwind.config.ts`
- `src/app/globals.css`

### Content Management

Use the admin panel to:

- Add/edit products
- Manage collections
- Update site settings
- Monitor analytics

## 📊 Analytics

Google Analytics 4 is integrated for:

- User behavior tracking
- Product view analytics
- WhatsApp click tracking
- Performance monitoring

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation
- CORS protection
- Security headers

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection:**

   - Check MongoDB URI format
   - Verify network access

2. **Build Errors:**

   - Check Node.js version (18+)
   - Verify all dependencies installed

3. **Environment Variables:**
   - Ensure all required variables are set
   - Check for typos

### Support

For issues, check:

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Vercel Documentation](https://vercel.com/docs)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email support@briggsfashion.com or create an issue in the repository.

---

Built with ❤️ for Nigerian Fashion
