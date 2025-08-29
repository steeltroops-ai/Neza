# 🏗️ Neza Technical Architecture - Enterprise-Grade System Design

## Strategic Purpose: Scalable Architecture for Rapid Development and Growth

**Objective**: Build production-ready platform that scales from MVP to millions of users while maintaining development velocity.

---

## 🎯 TECHNOLOGY STACK JUSTIFICATION

### Velocity-First Stack (Recommended for MVP)

**Philosophy**: Ship fast, validate market, scale intelligently

```typescript
// Core Technology Decisions
Frontend: Next.js 15+ + TypeScript + Tailwind CSS + Framer Motion
Backend: Supabase (PostgreSQL + Auth + Storage + Realtime)
Search: MeiliSearch for instant service discovery
Maps: Mapbox GL for location-based features
Payments: Stripe (global) + Razorpay (India) with escrow
Deployment: Vercel with automatic CI/CD
Monitoring: Sentry for error tracking + performance
```

### Why These Choices

- **Next.js**: Server components, API routes, SSR/SSG, image optimization - fastest UI development
- **Supabase**: Auth, Postgres, storage, realtime - minimal boilerplate, instant API
- **TypeScript**: Single language across frontend/backend - fastest iteration, fewer context switches
- **Postgres + PostGIS**: Robust relational queries and geolocation (essential for local matching)
- **MeiliSearch**: Instant, low-maintenance text+filter search (faster to integrate than Elasticsearch)

---

## 🏗️ SYSTEM ARCHITECTURE OVERVIEW

### High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client Apps   │    │   Edge/CDN       │    │   Core Services │
│                 │    │                  │    │                 │
│ • Web (Next.js) │◄──►│ • Vercel Edge    │◄──►│ • Supabase      │
│ • Mobile (PWA)  │    │ • Cloudflare     │    │ • API Routes    │
│ • Admin Panel   │    │ • Image Opt      │    │ • Serverless    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                         │
                       ┌─────────────────────────────────┼─────────────────────────────────┐
                       │                                 │                                 │
              ┌─────────▼────────┐              ┌────────▼────────┐              ┌────────▼────────┐
              │   Data Layer     │              │  External APIs  │              │  Background     │
              │                  │              │                 │              │  Workers        │
              │ • PostgreSQL     │              │ • Stripe/Razorpay│              │                 │
              │ • PostGIS        │              │ • Mapbox        │              │ • Payment Hooks │
              │ • MeiliSearch    │              │ • SMS/Email     │              │ • Notifications │
              │ • Redis Cache    │              │ • File Storage  │              │ • Analytics     │
              └──────────────────┘              └─────────────────┘              └─────────────────┘
```

### MVP vs. Scalable Architecture Trade-offs

| Component    | MVP Approach     | Scalable Approach        | Migration Path             |
| ------------ | ---------------- | ------------------------ | -------------------------- |
| **Database** | Single Postgres  | Sharded + Read Replicas  | Add replicas, then shard   |
| **Auth**     | Supabase Auth    | Custom JWT + Refresh     | Migrate gradually          |
| **Search**   | MeiliSearch      | Elasticsearch/OpenSearch | Data migration + API swap  |
| **Files**    | Supabase Storage | CDN + Object Storage     | Migrate files, update URLs |
| **Cache**    | Supabase Cache   | Redis Cluster            | Add Redis, deprecate old   |

---

## 🔧 CORE SERVICE DEFINITIONS

### 1. Authentication Service

**Responsibility**: User identity, session management, role-based access

```typescript
interface AuthService {
  // User Management
  registerUser(email: string, role: UserRole): Promise<User>;
  verifyOTP(userId: string, otp: string): Promise<AuthToken>;
  refreshToken(refreshToken: string): Promise<AuthToken>;

  // Role Management
  assignRole(userId: string, role: UserRole): Promise<void>;
  checkPermission(userId: string, resource: string): Promise<boolean>;
}

type UserRole = 'customer' | 'provider' | 'admin';
```

### 2. Provider Service

**Responsibility**: Provider onboarding, verification, service management

```typescript
interface ProviderService {
  // Onboarding
  createProvider(userId: string, businessInfo: BusinessInfo): Promise<Provider>;
  uploadVerificationDocs(providerId: string, docs: Document[]): Promise<void>;
  verifyProvider(providerId: string, adminId: string): Promise<void>;

  // Service Management
  createService(providerId: string, service: ServiceInfo): Promise<Service>;
  updateAvailability(providerId: string, schedule: Schedule): Promise<void>;
  getProvidersByLocation(lat: number, lng: number, radius: number): Promise<Provider[]>;
}
```

### 3. Booking Service

**Responsibility**: Booking lifecycle, availability management, status tracking

```typescript
interface BookingService {
  // Booking Management
  createBooking(customerId: string, serviceId: string, slot: TimeSlot): Promise<Booking>;
  confirmBooking(bookingId: string, providerId: string): Promise<void>;
  updateBookingStatus(bookingId: string, status: BookingStatus): Promise<void>;

  // Availability
  checkAvailability(serviceId: string, date: Date): Promise<TimeSlot[]>;
  blockTimeSlot(providerId: string, slot: TimeSlot): Promise<void>;
}

type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
```

### 4. Payment Service

**Responsibility**: Payment processing, escrow management, payouts

```typescript
interface PaymentService {
  // Payment Processing
  createPaymentIntent(bookingId: string, amount: number): Promise<PaymentIntent>;
  capturePayment(paymentId: string): Promise<Payment>;
  processRefund(paymentId: string, amount?: number): Promise<Refund>;

  // Escrow Management
  holdFunds(paymentId: string): Promise<void>;
  releaseFunds(paymentId: string, providerId: string): Promise<void>;

  // Provider Payouts
  createPayout(providerId: string, amount: number): Promise<Payout>;
  getEarnings(providerId: string, period: DateRange): Promise<Earnings>;
}
```

### 5. Search Service

**Responsibility**: Service discovery, filtering, ranking

```typescript
interface SearchService {
  // Service Discovery
  searchServices(query: SearchQuery): Promise<SearchResult[]>;
  getServicesByCategory(category: string, location: Location): Promise<Service[]>;
  getServicesByProvider(providerId: string): Promise<Service[]>;

  // Indexing
  indexService(service: Service): Promise<void>;
  updateServiceIndex(serviceId: string, updates: Partial<Service>): Promise<void>;
}

interface SearchQuery {
  text?: string;
  location: Location;
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  availability?: Date;
}
```

---

## 🗄️ DATABASE SCHEMA DESIGN

### Core Tables (PostgreSQL)

```sql
-- Users table (authentication and basic info)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Providers table (business information)
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  description TEXT,
  verification_status verification_status DEFAULT 'pending',
  location GEOGRAPHY(POINT, 4326), -- PostGIS for geospatial queries
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table (service listings)
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category service_category NOT NULL,
  price_min DECIMAL(10,2),
  price_max DECIMAL(10,2),
  duration_minutes INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table (booking lifecycle)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES users(id),
  provider_id UUID REFERENCES providers(id),
  service_id UUID REFERENCES services(id),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status booking_status DEFAULT 'pending',
  total_amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table (financial transactions)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  stripe_payment_id VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  status payment_status DEFAULT 'pending',
  escrow_released_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Performance Optimization

```sql
-- Geospatial index for location-based queries
CREATE INDEX idx_providers_location ON providers USING GIST (location);

-- Composite indexes for common queries
CREATE INDEX idx_services_category_active ON services (category, is_active);
CREATE INDEX idx_bookings_provider_status ON bookings (provider_id, status);
CREATE INDEX idx_bookings_customer_created ON bookings (customer_id, created_at DESC);

-- Full-text search index
CREATE INDEX idx_services_search ON services USING GIN (to_tsvector('english', title || ' ' || description));
```

---

## 🚀 DEVOPS PIPELINE

### CI/CD Workflow (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Environment Configuration

```typescript
// Environment-specific configurations
const config = {
  development: {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    stripe: {
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST,
    },
  },
  production: {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    stripe: {
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    },
  },
};
```

---

## 🔒 SECURITY FRAMEWORK

### Authentication & Authorization

- **JWT Tokens**: Short-lived access tokens (15 min) + long-lived refresh tokens (30 days)
- **Role-Based Access Control**: Customer, Provider, Admin roles with granular permissions
- **API Rate Limiting**: 100 requests/minute per user, 1000/minute per IP
- **CORS Configuration**: Strict origin policies for production

### Data Protection

- **Encryption at Rest**: Database encryption via Supabase/managed services
- **Encryption in Transit**: HTTPS everywhere, TLS 1.3 minimum
- **PII Handling**: Minimal data collection, GDPR-compliant deletion
- **Payment Security**: PCI DSS compliance via Stripe, no card data storage

### KYC & Compliance

```typescript
interface KYCRequirements {
  providers: {
    identity: 'government_id' | 'passport' | 'drivers_license';
    business: 'business_license' | 'tax_registration';
    address: 'utility_bill' | 'bank_statement';
  };
  verification: {
    automated: boolean; // OCR + identity verification APIs
    manual: boolean; // Admin review for edge cases
    turnaround: '24_hours';
  };
}
```

---

## 📊 SCALABILITY ROADMAP

### Phase 1: MVP (1K users)

- Single Postgres instance
- Supabase managed services
- Vercel serverless functions
- Basic monitoring with Sentry

### Phase 2: Growth (10K users)

- Read replicas for database
- Redis caching layer
- CDN for static assets
- Advanced monitoring with Datadog

### Phase 3: Scale (100K users)

- Database sharding by geography
- Microservices architecture
- Kubernetes orchestration
- Event-driven architecture

### Phase 4: Enterprise (1M+ users)

- Multi-region deployment
- Event sourcing + CQRS
- Machine learning pipeline
- Advanced analytics platform

---

## 🔍 MONITORING & OBSERVABILITY

### Error Tracking & Performance

```typescript
// Sentry configuration
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Filter sensitive data
    if (event.request?.data) {
      delete event.request.data.password;
      delete event.request.data.paymentMethod;
    }
    return event;
  },
});
```

### Key Metrics Dashboard

- **Performance**: Response times, Core Web Vitals, error rates
- **Business**: GMV, booking conversion, user retention
- **Infrastructure**: Database performance, API latency, uptime
- **Security**: Failed login attempts, suspicious activity, data breaches

---

**Architecture Decision**: Start with velocity-first stack for MVP, with clear migration path to production-grade infrastructure as we scale.\*\*
