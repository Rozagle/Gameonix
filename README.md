# Gameonix Gaming Shop

A professional gaming e-commerce website built with Next.js, inspired by Epic Games Store, featuring a sleek black and purple design with modern shadow effects.

## Features

### Pages & Routing
- **Home Page**: Dynamic content with SSR featuring game showcases
- **Shop Catalog**: Advanced filtering, pagination, and search functionality
- **Game Detail Pages**: SEO-optimized with detailed game information
- **Contact Page**: Working contact form with Google Maps integration
- **User Profile**: Purchase history, cart management, and user info

### Authentication
- Secure user authentication with NextAuth.js
- Email/password login system
- Google OAuth integration
- JWT/server session management
- Protected routes for user areas

### Shopping Cart & Payments
- Full shopping cart functionality (add/remove/update items)
- PayPal integration for secure payments
- Stripe integration for credit card processing
- Complete checkout flow with validation
- Order processing and history tracking

### Backend & Database
- Next.js API routes for all backend operations
- MongoDB database with Mongoose ORM
- User management and authentication
- Order processing and tracking
- Game catalog management

### UI & UX Design
- Modern black and purple color scheme with shadow effects
- Fully responsive design for all devices
- Smooth animations and hover effects
- Advanced filtering by genre, platform, and price
- Search functionality with real-time results
- Professional gaming-inspired interface

### Performance & SEO
- Server-side rendering (SSR) for optimal SEO
- Static generation for improved performance
- Optimized images and lazy loading
- Fast page loads and smooth navigation

## Technology Stack

- **Frontend**: Next.js 13, React, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with Google OAuth
- **Payments**: PayPal SDK, Stripe SDK
- **UI Components**: Radix UI, Shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Yup validation
- **State Management**: React Context API

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- MongoDB instance (local or cloud)
- Google OAuth credentials
- PayPal developer account
- Stripe developer account

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd gameonix-gaming-shop
   npm install
   ```

2. **Environment Variables:**
   Create a `.env.local` file with the following variables:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/gameonix

   # NextAuth.js
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # PayPal
   PAYPAL_CLIENT_ID=your-paypal-client-id
   PAYPAL_CLIENT_SECRET=your-paypal-client-secret

   # Stripe
   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

   # Email (for contact form)
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   EMAIL_FROM=noreply@gameonix.com
   ```

3. **Database Setup:**
   - Install MongoDB locally or use MongoDB Atlas
   - The app will automatically create collections on first run
   - Seed data is included for demo purposes

4. **Google OAuth Setup:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

5. **PayPal Setup:**
   - Create a [PayPal Developer Account](https://developer.paypal.com/)
   - Create a sandbox application
   - Get Client ID and Client Secret from the app dashboard

6. **Stripe Setup:**
   - Create a [Stripe Account](https://stripe.com/)
   - Get publishable and secret keys from the dashboard
   - Set up webhooks for payment confirmation

### Running the Application

1. **Development Mode:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

2. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── game/              # Game detail pages
│   ├── shop/              # Shop catalog page
│   ├── profile/           # User profile page
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Shadcn/ui components
│   ├── Navigation.tsx    # Main navigation
│   ├── GameCard.tsx      # Game card component
│   └── ...
├── context/              # React context providers
│   ├── AuthContext.tsx   # Authentication context
│   └── CartContext.tsx   # Shopping cart context
├── lib/                  # Utility libraries
│   ├── mongodb.ts        # MongoDB connection
│   ├── mongoose.ts       # Mongoose connection
│   └── utils.ts          # Utility functions
├── models/               # Database models
│   ├── User.ts           # User model
│   └── Game.ts           # Game model
└── public/               # Static assets
```

## Features in Detail

### Shopping Cart
- Add/remove games from cart
- Update quantities
- Persistent cart (localStorage for guests, database for users)
- Real-time cart total calculation
- Smooth animations and feedback

### Payment Processing
- Multiple payment options (PayPal, Stripe)
- Secure checkout process
- Order confirmation and tracking
- Payment history in user profile

### Game Catalog
- Advanced search functionality
- Filter by category, platform, price range
- Sort by price, rating, popularity, release date
- Pagination for large catalogs
- Responsive grid and list views

### User Authentication
- Secure login/logout
- Google OAuth integration
- Protected routes
- User profile management
- Purchase history tracking

### Performance Optimizations
- Image optimization and lazy loading
- Server-side rendering for SEO
- Static generation where appropriate
- Efficient database queries
- Optimized bundle sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@gameonix.com or create an issue in the repository.