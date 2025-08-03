# Repository Tour

## 🎯 What This Repository Does

Neza is a modern local services marketplace platform designed to connect households and businesses with trusted service providers across emerging markets, starting in Uganda and expanding globally.

**Key responsibilities:**
- Connect clients with verified local service providers
- Facilitate secure booking and payment processing with escrow
- Provide trust mechanisms through reviews, ratings, and KYC verification
- Enable service discovery through categories and geolocation

---

## 🏗️ Architecture Overview

### System Context
```
[Clients/Providers] → [Neza Platform] → [PostgreSQL Database]
                           ↓
                    [Payment Gateways] → [Escrow System]
                           ↓
                    [Authentication] → [Clerk/JWT]
```

### Key Components
- **Frontend (Next.js)** - Progressive Web App with mobile-first design, handles user interface and client-side logic
- **Backend (NestJS)** - RESTful API server with modular architecture, handles business logic and data processing
- **Database (PostgreSQL)** - Relational database with Prisma ORM for data persistence and complex relationships
- **Authentication System** - Dual authentication with Clerk for frontend and JWT for backend API security
- **Payment Processing** - Integrated payment gateways with escrow functionality for secure transactions

### Data Flow
1. User registers/authenticates through Clerk or JWT system
2. Service providers create listings with categories and availability
3. Clients search and filter services by location, price, and ratings
4. Booking requests are created and confirmed by providers
5. Payments are processed through escrow until service completion
6. Reviews and ratings are collected post-service for trust building

---

## 📁 Project Structure [Partial Directory Tree]

```
neza/
├── frontend/                   # Next.js 14 frontend application
│   ├── app/                   # App Router structure
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboards
│   │   ├── services/          # Service browsing and details
│   │   ├── bookings/          # Booking management
│   │   └── layout.tsx         # Root layout component
│   ├── components/            # Reusable React components
│   │   ├── ui/                # shadcn/ui base components
│   │   ├── auth/              # Authentication components
│   │   ├── layout/            # Layout components (Header, Footer)
│   │   ├── services/          # Service-related components
│   │   └── shared/            # Shared utility components
│   └── lib/                   # Utility functions and configurations
├── backend/                   # NestJS backend API
│   ├── src/                   # Source code
│   │   ├── auth/              # Authentication module (JWT, guards)
│   │   ├── users/             # User management module
│   │   ├── services/          # Service listings and categories
│   │   ├── bookings/          # Booking system module
│   │   ├── payments/          # Payment processing module
│   │   ├── prisma/            # Database service module
│   │   └── main.ts            # Application entry point
│   └── prisma/                # Database schema and migrations
├── docs/                      # Project documentation
│   ├── README.md              # Project overview and vision
│   ├── MVP_DEVELOPMENT_PLAN.md # Structured development roadmap
│   ├── PROJECT_SETUP.md       # Development environment setup
│   └── CLERK_SETUP.md         # Authentication configuration
└── package.json               # Root dependencies
```

### Key Files to Know

| File | Purpose | When You'd Touch It |
|------|---------|---------------------|
| `frontend/app/layout.tsx` | Root layout with providers | Adding global providers or layout changes |
| `frontend/app/page.tsx` | Homepage with hero and features | Updating landing page content |
| `backend/src/main.ts` | Backend application entry point | Configuring server settings or middleware |
| `backend/prisma/schema.prisma` | Database schema definition | Adding new models or relationships |
| `backend/src/app.module.ts` | Main application module | Adding new feature modules |
| `frontend/components/layout/Header.tsx` | Navigation header component | Updating navigation or auth UI |
| `MVP_DEVELOPMENT_PLAN.md` | Development roadmap | Planning features and tracking progress |
| `PROJECT_SETUP.md` | Setup instructions | Setting up development environment |

---

## 🔧 Technology Stack

### Core Technologies
- **Language:** TypeScript (5.x) - Type safety and better developer experience
- **Frontend Framework:** Next.js 14 (App Router) - React framework with SSR and performance optimization
- **Backend Framework:** NestJS 10 - Scalable Node.js framework with decorators and dependency injection
- **Database:** PostgreSQL with Prisma ORM - Relational database with type-safe query builder

### Frontend Libraries
- **UI Framework:** TailwindCSS + shadcn/ui - Utility-first CSS with pre-built accessible components
- **State Management:** Zustand - Lightweight state management for React
- **Data Fetching:** TanStack React Query - Server state management and caching
- **Animation:** Framer Motion - Smooth animations and transitions
- **Forms:** React Hook Form + Zod - Type-safe form handling with validation
- **Authentication:** Clerk - Complete authentication solution with social logins

### Backend Libraries
- **Authentication:** JWT + Passport - Token-based authentication with strategy pattern
- **Validation:** class-validator + class-transformer - DTO validation and transformation
- **Documentation:** Swagger/OpenAPI - Automated API documentation
- **Security:** bcrypt - Password hashing and security utilities
- **Rate Limiting:** @nestjs/throttler - API rate limiting and protection

### Development Tools
- **Package Manager:** npm - Dependency management
- **Code Quality:** ESLint + Prettier - Code linting and formatting
- **Testing:** Jest - Unit and integration testing framework
- **Database Tools:** Prisma Studio - Database GUI for development

---

## 🌐 External Dependencies

### Required Services
- **PostgreSQL Database** - Primary data storage for users, services, bookings, and transactions
- **Clerk Authentication** - User authentication and management service for frontend
- **Payment Gateways** - Flutterwave, Paystack, M-Pesa integration for local payments (planned)

### Development Dependencies
- **Node.js 18+** - Runtime environment for both frontend and backend
- **TypeScript Compiler** - Type checking and compilation
- **Prisma CLI** - Database schema management and migrations

---

## 🔄 Common Workflows

### User Registration and Onboarding
1. User visits registration page and selects role (Client/Provider)
2. Clerk handles authentication with email/phone verification
3. Backend creates user profile with role-specific fields
4. Providers complete additional verification (KYC documents)
5. User profile is activated and ready for platform use

**Code path:** `frontend/app/auth/register` → `Clerk Auth` → `backend/src/auth` → `backend/src/users`

### Service Booking Process
1. Client searches services by category, location, or keywords
2. Service details page shows provider info, pricing, and availability
3. Client selects time slot and creates booking request
4. Provider receives notification and confirms/rejects booking
5. Payment is processed and held in escrow until completion
6. Service is completed and payment is released to provider

**Code path:** `frontend/app/services` → `backend/src/services` → `backend/src/bookings` → `backend/src/payments`

---

## 📈 Performance & Scale

### Performance Considerations
- **Next.js SSR/SSG** - Server-side rendering for faster initial page loads
- **React Query Caching** - Intelligent data caching and background updates
- **Database Indexing** - Optimized queries with Prisma indexes on frequently accessed fields
- **Image Optimization** - Next.js automatic image optimization and lazy loading

### Monitoring
- **API Documentation** - Swagger UI available at `/api/docs` for backend API exploration
- **Database Studio** - Prisma Studio for database inspection during development
- **Development Logs** - Structured logging in NestJS for debugging and monitoring

---

## 🚨 Things to Be Careful About

### 🔒 Security Considerations
- **Authentication:** Dual authentication system (Clerk + JWT) requires careful token management
- **Data Validation:** All API inputs validated using class-validator DTOs
- **Rate Limiting:** API endpoints protected with throttling to prevent abuse
- **Password Security:** bcrypt hashing for secure password storage

### Development Notes
- **Database Migrations** - Always run `prisma migrate dev` after schema changes
- **Environment Variables** - Use `.env.example` files as templates for local setup
- **Type Safety** - Leverage TypeScript strictly; avoid `any` types
- **Component Structure** - Follow established patterns in `components/` directory

---

*Updated at: 2024-12-19 UTC*
*Repository Status: Early development phase - comprehensive planning completed, core architecture established*