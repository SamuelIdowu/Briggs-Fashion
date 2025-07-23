# Briggs Fashion - Deployment Guide

## 📊 Project Overview

This document provides deployment instructions for the Briggs Fashion e-commerce platform.

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

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Brigg's Fashion and Store
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

4. **Connect Custom Domain (Optional):**
   - Add your domain in Vercel dashboard
   - Update DNS records as instructed

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
