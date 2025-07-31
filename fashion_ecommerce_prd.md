# Nigerian Fashion E-commerce Website - Product Requirements Document

## Project Overview

### Product Vision

A modern, efficient e-commerce platform for a Nigerian fashion retailer specializing in men's traditional and casual wear, offering both custom tailoring and ready-made items with WhatsApp-based customer communication.

### Target Audience

- Nigerian men aged 25-45
- Fashion-conscious individuals seeking quality traditional and casual wear
- Customers preferring personalized service through WhatsApp communication

### Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (cloud-hosted, e.g., MongoDB Atlas)
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: MongoDB
- **Styling**: Tailwind CSS
- **State Management**: Context API

## Core Features & Requirements

### 1. Product Catalog System

#### 1.1 Product Display

- **Unlimited product listings** with comprehensive product information
- **High-quality image gallery** (minimum 2, maximum 4 images per product)
- **Product variations** (sizes, colors, fabric types)
- **Product categories**:
  - Traditional Wear (Agbada, Dashiki, Kaftan, etc.)
  - Casual Wear (Shirts, Trousers, Polo, etc.)
  - Custom Tailoring Services
- **Detailed product descriptions** including:
  - Material composition
  - Care instructions
  - Sizing information
  - Availability status (Ready-made vs Made-to-order)

#### 1.2 Product Collections

- **Featured Products** section on homepage
- **New Arrivals** collection
- **Traditional Wear** collection
- **Casual Wear** collection
- **Custom Tailoring** services section

#### 1.3 Search & Filter System

- **Global search** functionality
- **Advanced filters**:
  - Category (Traditional/Casual)
  - Type (Ready-made/Custom)
  - Size availability
  - Color options
  - Price range
  - Material type

### 2. User Interface & Experience

#### 2.1 Design Requirements

- **Mobile-first responsive design**
- **Minimalistic aesthetic** with **gold and black color scheme**
- **Clean typography** with plenty of white space
- **Subtle gold accents** on buttons, borders, and highlights
- **Black text** on white/light backgrounds for optimal readability
- **Fast loading times** (< 3 seconds)
- **Intuitive navigation** with clear category structure
- **High-quality product imagery** with zoom functionality
- **Premium feel** reflecting luxury Nigerian fashion culture

#### 2.2 Color Palette & Typography

- **Primary Colors**:
  - Deep Black (#000000) - Main text and headers
  - Pure White (#FFFFFF) - Background
  - Elegant Gold (#FFD700 / #B8860B) - Accents and CTAs
- **Secondary Colors**:
  - Light Gray (#F5F5F5) - Subtle backgrounds
  - Medium Gray (#888888) - Secondary text
- **Typography**:
  - Modern sans-serif font family (Inter, Poppins, or similar)
  - Clean hierarchy with proper font weights

#### 2.3 Core Pages

- **Homepage** with hero section, featured products, and collections
- **Product listing pages** with filtering and sorting
- **Product detail modal/popup** with comprehensive product information
- **About Us** page with brand story
- **Contact** page with business information
- **Size Guide** page for both ready-made and custom items

#### 2.4 Product Detail Modal System

- **Overlay modal** triggered by clicking product cards
- **Smooth animations** (fade-in/slide-up) for modal open/close
- **Image carousel** within modal (2-4 images with navigation dots)
- **Product information panel** with:
  - Product name and price
  - Size/color selection
  - Description and details
  - WhatsApp inquiry button (gold accent)
- **Close functionality** via X button, overlay click, or ESC key
- **Mobile-optimized** modal taking full screen on mobile devices
- **Keyboard navigation** support for accessibility

### 3. WhatsApp Integration System

#### 3.1 Product Inquiry Flow

- **"Inquire on WhatsApp" button** on every product page
- **Pre-populated WhatsApp message** containing:
  - Product name and SKU
  - Selected size/color (if applicable)
  - Product URL for reference
  - Standard greeting message
- **Custom message templates** for different product types:
  - Ready-made items: "Hello! I'm interested in [Product Name]. Is this available in [Size/Color]?"
  - Custom tailoring: "Hello! I'd like to discuss custom tailoring for [Product Name]. Can we schedule a consultation?"

#### 3.2 Contact Integration

- **WhatsApp floating action button** for general inquiries
- **Multiple WhatsApp numbers** support (sales, custom orders, customer service)
- **Business hours display** with automatic after-hours messaging

### 4. Admin Panel & Content Management

#### 4.1 Admin Dashboard

- **Secure admin authentication**
- **Dashboard overview** with key metrics:
  - Total products
  - Product views
  - WhatsApp inquiries tracking
  - Popular products

#### 4.2 Product Management

- **Add/Edit/Delete products** with rich text editor
- **Bulk image upload** with drag-and-drop functionality
- **Product variation management** (sizes, colors, pricing)
- **Inventory status updates** (Available, Out of Stock, Made-to-Order)
- **SEO fields** for each product (meta title, description, keywords)

#### 4.3 Content Management

- **Homepage content editing** (hero section, featured products)
- **Collection management** (create, edit, delete collections)
- **About Us page editor**
- **Size guide management**
- **Business information updates** (contact details, WhatsApp numbers)

### 5. Performance & SEO Features

#### 5.1 Performance Optimization

- **Image optimization** with multiple size variants
- **Lazy loading** for images and components
- **Caching strategies** for static content
- **Progressive Web App** capabilities

#### 5.2 SEO Features

- **Meta tags management** for all pages
- **Structured data** for products (schema.org)
- **Sitemap generation**
- **Clean URLs** with product names
- **Open Graph tags** for social media sharing

### 6. Analytics & Tracking

#### 6.1 User Analytics

- **Google Analytics 4** integration
- **Product view tracking**
- **WhatsApp click tracking**
- **User journey analysis**

#### 6.2 Business Intelligence

- **Popular products reporting**
- **Traffic source analysis**
- **Mobile vs desktop usage statistics**
- **Geographic user distribution**

## Technical Specifications

### 7. Database Schema

#### 7.1 Products Collection

```javascript
{
  id: string,
  name: string,
  description: string,
  category: 'traditional' | 'casual' | 'custom',
  type: 'ready-made' | 'made-to-order',
  images: string[], // 2-4 images per product
  price: number,
  variations: {
    sizes: string[],
    colors: string[],
    materials: string[]
  },
  seo: {
    metaTitle: string,
    metaDescription: string,
    keywords: string[]
  },
  isActive: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### 7.2 Collections

```javascript
{
  id: string,
  name: string,
  description: string,
  products: string[], // product IDs
  isActive: boolean,
  createdAt: timestamp
}
```

#### 7.3 Site Settings

```javascript
{
  businessInfo: {
    name: string,
    address: string,
    phone: string,
    whatsappNumbers: {
      sales: string,
      custom: string,
      support: string
    },
    businessHours: string
  },
  homepage: {
    heroTitle: string,
    heroDescription: string,
    featuredProducts: string[]
  }
}
```

### 8. API Endpoints

#### 8.1 Public API

- `GET /api/products` - Get all products with pagination and filters
- `GET /api/products/:id` - Get single product details
- `GET /api/collections` - Get all collections
- `GET /api/collections/:id` - Get collection with products
- `GET /api/settings` - Get public site settings

#### 8.2 Admin API

- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `POST /api/admin/collections` - Create collection
- `PUT /api/admin/settings` - Update site settings

### 9. Component Architecture

#### 9.1 Core Components

- `ProductCard` - Reusable product display component with click handler for modal
- `ProductModal` - Popup modal for product details with image carousel
- `ImageCarousel` - Image gallery component for modal (2-4 images)
- `WhatsAppButton` - WhatsApp integration component with gold styling
- `SearchBar` - Global search functionality
- `FilterSidebar` - Product filtering interface
- `AdminLayout` - Admin panel layout wrapper
- `Modal` - Reusable modal component with overlay

#### 9.2 Page Components

- `Homepage` - Landing page with hero and featured products
- `ProductList` - Product listing with filters and modal integration
- `AdminDashboard` - Admin overview
- `ProductManager` - Admin product management

## Development Phases

### Phase 1: MVP (Weeks 1-3)

- Basic product catalog
- Product detail pages
- WhatsApp integration
- Basic admin panel
- Responsive design

### Phase 2: Enhanced Features (Weeks 4-5)

- Collections management
- SEO optimization
- Performance optimization

### Phase 3: Analytics & Polish (Week 6)

- Analytics integration
- Admin dashboard enhancements
- Final testing and optimization
- Deployment preparation

## File Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Modal.jsx
│   │   └── WhatsAppButton.jsx
│   ├── product/
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── ImageCarousel.jsx
│   │   └── ProductList.jsx
│   └── admin/
│       ├── AdminLayout.jsx
│       ├── ProductManager.jsx
│       └── Dashboard.jsx
├── pages/
│   ├── Homepage.jsx
│   ├── ProductListPage.jsx
│   └── admin/
│       ├── AdminDashboard.jsx
│       └── ProductManagement.jsx
├── hooks/
│   ├── useProducts.js
│   ├── useWhatsApp.js
│   ├── useModal.js
│   └── useAdmin.js
├── services/
│   ├── productService.js
│   └── whatsappService.js
├── contexts/
│   ├── AuthContext.jsx
│   └── ProductContext.jsx
├── styles/
│   ├── globals.css
│   └── modal.css
└── utils/
    ├── constants.js
    ├── helpers.js
    └── whatsappUtils.js
```

## Success Metrics

### Business Metrics

- **WhatsApp inquiry rate**: Target 15% of product views
- **Mobile usage**: Target 70%+ mobile traffic
- **Page load speed**: < 3 seconds on mobile
- **Admin efficiency**: Product updates in < 2 minutes

### Technical Metrics

- **Core Web Vitals**: All metrics in "Good" range
- **SEO scores**: 90+ on Lighthouse
- **Accessibility**: WCAG 2.1 AA compliance
- **Cross-browser compatibility**: Chrome, Safari, Firefox, Edge

## Deployment & Maintenance

### Deployment Requirements

- **Hosting**: Vercel or Netlify for frontend
- **Database**: MongoDB Atlas (cloud-hosted)
- **Domain**: Custom domain with SSL
- **CDN**: Cloudflare for image optimization

### Maintenance Plan

- **Monthly content updates** via admin panel
- **Quarterly performance audits**
- **Annual security reviews**
- **Backup strategy**: Daily automated backups

---

_This PRD serves as the foundation for building a modern, efficient Nigerian fashion e-commerce platform focused on WhatsApp-based customer engagement and excellent user experience._
