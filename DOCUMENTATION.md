# Neza Platform - Technical Documentation

## Overview

Neza is a modern service marketplace platform connecting clients with service providers. Built with a robust backend API using NestJS and a responsive frontend using Next.js with TypeScript.

## Architecture

### Backend (NestJS + Prisma + SQLite)
- **Framework**: NestJS with TypeScript
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma
- **Authentication**: JWT tokens with bcrypt password hashing
- **API Documentation**: Swagger/OpenAPI
- **Port**: 3001

### Frontend (Next.js + React + TypeScript)
- **Framework**: Next.js 14 with App Router
- **UI Library**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand + React Query
- **Authentication**: Clerk (configured but simplified for development)
- **Animations**: Framer Motion
- **Port**: 3000

## Key Features

### Authentication & Authorization
- **JWT-based authentication** with access and refresh tokens
- **Role-based access control** (CLIENT, PROVIDER, ADMIN)
- **Password hashing** using bcrypt
- **Email validation** and duplicate prevention

### User Management
- **User registration** with automatic wallet creation
- **Profile management** with secure password updates
- **Role-based permissions** for different user types
- **User search** and filtering capabilities

### Service Management
- **Service creation** by providers
- **Category-based organization** of services
- **Service search** and filtering
- **Provider profiles** with service listings

### Booking System
- **Service booking** with time slots
- **Booking status management** (PENDING, CONFIRMED, COMPLETED, CANCELLED)
- **Role-based booking permissions**
- **Booking history** and management

### Payment Processing
- **Secure payment handling** with transaction records
- **Wallet system** for users
- **Payment status tracking**
- **Transaction history**

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/profile` - Get user profile

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Services
- `POST /api/services` - Create service (Provider only)
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/provider/:providerId` - Get services by provider
- `PATCH /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Categories
- `POST /api/categories` - Create category (Admin only)
- `GET /api/categories` - Get all categories
- `GET /api/categories/popular` - Get popular categories
- `GET /api/categories/:id` - Get category by ID
- `PATCH /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Bookings
- `POST /api/bookings` - Create booking (Client only)
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PATCH /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Payments
- `POST /api/payments` - Create payment (Client only)
- `GET /api/payments` - Get user's payments
- `GET /api/payments/:id` - Get payment by ID
- `PATCH /api/payments/:id` - Update payment (Admin/Provider only)
- `DELETE /api/payments/:id` - Delete payment (Admin only)

## Frontend Components

### Layout Components
- **Header**: Main navigation with responsive mobile menu
- **Footer**: Site footer with links and contact information

### Shared Components
- **ServiceCard**: Displays service information in card format
- **CategoryCard**: Shows service categories with counts
- **TestimonialCard**: User testimonials display
- **HowItWorksCard**: Step-by-step process explanation

### UI Components
- **Button**: Customizable button component with variants
- **Card**: Container component for content sections
- **Badge**: Small status/label indicators
- **Input**: Form input fields with validation
- **Dialog**: Modal dialogs for user interactions

## Database Schema

### Core Models
- **User**: User accounts with authentication and profile data
- **Wallet**: User financial accounts with balance tracking
- **Service**: Service offerings by providers
- **Category**: Service categorization system
- **Booking**: Service booking records
- **Payment**: Payment transaction records
- **Review**: User reviews and ratings
- **Message**: Communication between users
- **Notification**: System notifications

### Relationships
- Users have one Wallet
- Users can have many Services (as providers)
- Users can have many Bookings (as clients or providers)
- Services belong to Categories
- Bookings have associated Payments
- Users can leave Reviews for Bookings

## Security Features

### Backend Security
- **Password hashing** with bcrypt (salt rounds: 10)
- **JWT token validation** for protected routes
- **Role-based access control** with guards
- **Input validation** using class-validator
- **Rate limiting** to prevent abuse
- **CORS configuration** for cross-origin requests

### Frontend Security
- **Client-side validation** with form libraries
- **Secure token storage** (when authentication is fully implemented)
- **Protected routes** based on user authentication
- **XSS prevention** through React's built-in protections

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

#### Backend (.env)
```
PORT=3001
NODE_ENV=development
API_PREFIX=api
FRONTEND_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

## Code Quality Standards

### Documentation Standards
- **JSDoc comments** for all public methods and classes
- **TypeScript interfaces** for all data structures
- **Inline comments** for complex business logic
- **README files** for each major module

### Code Organization
- **Modular architecture** with clear separation of concerns
- **Consistent naming conventions** (camelCase for variables, PascalCase for components)
- **Error handling** with appropriate exception types
- **Type safety** with TypeScript throughout

### Testing Approach
- **Unit tests** for business logic
- **Integration tests** for API endpoints
- **Component tests** for React components
- **E2E tests** for critical user flows

## Performance Optimizations

### Backend
- **Database indexing** on frequently queried fields
- **Pagination** for large data sets
- **Caching** with Redis (planned)
- **Query optimization** with Prisma

### Frontend
- **Code splitting** with Next.js dynamic imports
- **Image optimization** with Next.js Image component
- **Static generation** for public pages
- **Client-side caching** with React Query

## Deployment

### Production Considerations
- **Environment-specific configurations**
- **Database migrations** for schema updates
- **SSL/TLS certificates** for secure connections
- **Load balancing** for high availability
- **Monitoring and logging** for production issues

### Recommended Stack
- **Backend**: Railway, Fly.io, or AWS ECS
- **Frontend**: Vercel or Netlify
- **Database**: PostgreSQL on AWS RDS or Supabase
- **File Storage**: AWS S3 or Cloudinary

## Contributing

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write comprehensive JSDoc documentation
- Include unit tests for new features

### Git Workflow
- Feature branches for new development
- Pull requests for code review
- Conventional commit messages
- Automated testing in CI/CD pipeline

## Support and Maintenance

### Monitoring
- **Error tracking** with Sentry (planned)
- **Performance monitoring** with application metrics
- **Database monitoring** for query performance
- **User analytics** with privacy-compliant tools

### Backup and Recovery
- **Database backups** with automated scheduling
- **Code repository** backup and versioning
- **Environment configuration** backup
- **Disaster recovery** procedures

---

This documentation provides a comprehensive overview of the Neza platform architecture, features, and development practices. For specific implementation details, refer to the inline code documentation and individual component/service files.