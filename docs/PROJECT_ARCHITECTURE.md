# 🏗️ Neza Platform - Project Architecture

## 🎯 **ARCHITECTURE OVERVIEW**

Neza is built with a modern, scalable architecture designed for rapid development, enterprise-grade performance, and global scalability. Our technology choices prioritize developer experience, time-to-market, and long-term maintainability while delivering a premium user experience.

## 🛠️ **TECHNOLOGY STACK DECISIONS**

### 🔐 **Authentication: Clerk** ⭐ **SELECTED**

**Decision Rationale:**
- **10x Faster Implementation**: 2 hours vs 2 weeks for custom auth
- **Enterprise Features**: MFA, SSO, user management dashboard out of the box
- **Premium UI Components**: Beautiful, customizable auth flows that match our design system
- **Security**: SOC 2 compliant with automatic security updates
- **Cost**: Free tier generous, scales with usage
- **Mobile Ready**: Native SDKs for future mobile app development

**Implementation Benefits:**
- Zero security maintenance overhead
- Premium components that integrate seamlessly
- Real-time user sync with webhooks
- Enterprise-grade features from day one

### 🗄️ **Backend: Supabase** ⭐ **SELECTED**

**Decision Rationale:**
- **PostgreSQL**: Superior for complex relational data (users, services, bookings, payments)
- **Auto-generated APIs**: REST and GraphQL with TypeScript types
- **Row Level Security**: Perfect for multi-tenant marketplace security
- **Real-time**: Built-in subscriptions for chat, notifications, live updates
- **File Storage**: Integrated storage for service images and documents
- **Edge Functions**: Serverless functions for custom business logic

**Implementation Benefits:**
- 1 day setup vs 1 week for custom backend
- Auto-generated TypeScript types from database schema
- Built-in real-time features vs complex WebSocket implementation
- Integrated file storage vs custom S3 setup

### 💳 **Additional Services**

**Payments: Stripe**
- Industry standard with excellent developer experience
- Comprehensive marketplace features (escrow, payouts, multi-party payments)
- Global currency support and compliance

**Email: Resend**
- Modern email API with excellent deliverability
- Beautiful email templates and analytics
- Developer-friendly with great documentation

**Deployment: Vercel**
- Seamless Next.js integration with zero configuration
- Global edge network for optimal performance
- Automatic scaling and optimization

## 🏗️ **FRONTEND ARCHITECTURE**

### ⚛️ **React Ecosystem**

```typescript
// Core Framework Stack
const frontendStack = {
  framework: "Next.js 15+",           // Latest App Router with Server Components
  runtime: "React 18.3.1",           // Concurrent features and Suspense
  language: "TypeScript 5+",          // Strict type safety
  styling: "Tailwind CSS 3+",         // Utility-first CSS framework
  animations: "Framer Motion 11+",    // Advanced animation library
  stateManagement: "Zustand",         // Lightweight state management
  serverState: "TanStack Query",      // Server state management and caching
  forms: "React Hook Form + Zod",     // Performant forms with validation
  ui: "Radix UI + shadcn/ui",        // Accessible component primitives
  icons: "Lucide React",              // Beautiful, consistent icons
};
```

### 🎨 **Design System Architecture**

```typescript
// Design Token System
const designSystem = {
  colors: {
    primary: "#3B82F6",      // Professional Blue - Trust & reliability
    secondary: "#64748B",    // Sophisticated Gray - Balance & elegance
    accent: "#22C55E",       // Success Green - Growth & positive actions
    semantic: {
      success: "#22C55E",
      warning: "#F59E0B", 
      error: "#EF4444",
      info: "#3B82F6"
    }
  },
  typography: {
    fontFamily: "Inter",     // Modern, professional font
    scale: 1.25,            // Mathematical progression
    weights: [400, 500, 600, 700, 800]
  },
  spacing: {
    baseUnit: 4,            // 4px base unit for consistency
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
  },
  animations: {
    duration: {
      fast: "150ms",
      normal: "300ms", 
      slow: "500ms"
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.22, 1, 0.36, 1)"
    }
  }
};
```

### 📁 **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   │   ├── sign-in/       # Sign-in page with Clerk
│   │   └── sign-up/       # Sign-up page with Clerk
│   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── client/        # Client dashboard
│   │   ├── provider/      # Provider dashboard
│   │   └── admin/         # Admin dashboard
│   ├── (public)/          # Public routes
│   │   ├── services/      # Service discovery
│   │   ├── providers/     # Provider profiles
│   │   └── about/         # Static pages
│   ├── api/               # API routes (if needed)
│   ├── globals.css        # Global styles with design tokens
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/                # Base UI components (atoms)
│   │   ├── button.tsx     # Premium button with variants
│   │   ├── input.tsx      # Sophisticated input with animations
│   │   ├── card.tsx       # Glass morphism cards
│   │   └── ...
│   ├── layout/            # Layout components
│   │   ├── header.tsx     # Premium navigation header
│   │   ├── footer.tsx     # Footer component
│   │   └── sidebar.tsx    # Dashboard sidebar
│   ├── features/          # Feature-specific components
│   │   ├── auth/          # Authentication components
│   │   ├── services/      # Service-related components
│   │   ├── bookings/      # Booking components
│   │   └── payments/      # Payment components
│   └── providers/         # Context providers
│       ├── theme-provider.tsx
│       ├── query-provider.tsx
│       └── clerk-provider.tsx
├── lib/                   # Utility libraries
│   ├── utils.ts           # General utilities
│   ├── supabase.ts        # Supabase client configuration
│   ├── stripe.ts          # Stripe client configuration
│   └── validations.ts     # Zod validation schemas
├── hooks/                 # Custom React hooks
│   ├── use-auth.ts        # Authentication hooks
│   ├── use-services.ts    # Service-related hooks
│   └── use-bookings.ts    # Booking-related hooks
├── stores/                # Zustand state stores
│   ├── auth-store.ts      # Authentication state
│   ├── ui-store.ts        # UI state (modals, etc.)
│   └── booking-store.ts   # Booking state
├── types/                 # TypeScript type definitions
│   ├── database.ts        # Supabase generated types
│   ├── auth.ts            # Authentication types
│   └── api.ts             # API response types
└── styles/                # Styling files
    ├── globals.css        # Global styles and design tokens
    └── components.css     # Component-specific styles
```

## 🗄️ **BACKEND ARCHITECTURE**

### 🐘 **Supabase Configuration**

```sql
-- Core Database Schema
CREATE TYPE user_role AS ENUM ('CLIENT', 'PROVIDER', 'ADMIN');
CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- Users table with role-based access
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'CLIENT',
  avatar_url TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (clerk_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (clerk_id = auth.jwt() ->> 'sub');
```

### 🔄 **Real-time Features**

```typescript
// Real-time subscriptions for live updates
const useRealtimeBookings = (userId: string) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const subscription = supabase
      .channel('user-bookings')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bookings',
        filter: `client_id=eq.${userId}`
      }, (payload) => {
        handleBookingUpdate(payload);
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, [userId]);

  return bookings;
};
```

## 🚀 **DEPLOYMENT ARCHITECTURE**

### ☁️ **Infrastructure Stack**

```typescript
const deploymentStack = {
  frontend: {
    platform: "Vercel",
    features: [
      "Edge Runtime",
      "Incremental Static Regeneration", 
      "Image Optimization",
      "Global CDN"
    ],
    performance: [
      "Automatic code splitting",
      "Edge caching",
      "Serverless functions"
    ]
  },
  backend: {
    platform: "Supabase",
    features: [
      "Auto-scaling PostgreSQL",
      "Global distribution",
      "Automated backups",
      "Connection pooling"
    ],
    performance: [
      "Query optimization",
      "Database indexing",
      "Edge functions"
    ]
  },
  authentication: {
    platform: "Clerk",
    features: [
      "Global user management",
      "Session management",
      "Security monitoring"
    ]
  },
  payments: {
    platform: "Stripe",
    features: [
      "Global payment processing",
      "Marketplace features",
      "Compliance management"
    ]
  }
};
```

## 📊 **PERFORMANCE TARGETS**

### 🎯 **Core Web Vitals**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 800ms
- **Lighthouse Score**: 95+ across all metrics

### 📈 **Scalability Metrics**
- **Concurrent Users**: 100K+ simultaneous users
- **API Requests**: 10K+ requests per second
- **Database**: Auto-scaling with connection pooling
- **Storage**: Unlimited with CDN distribution
- **Uptime**: 99.9% availability SLA

## 🔒 **SECURITY ARCHITECTURE**

### 🛡️ **Security Layers**

```typescript
const securityStack = {
  authentication: {
    provider: "Clerk",
    features: ["MFA", "SSO", "Session management"],
    compliance: "SOC 2 Type II"
  },
  authorization: {
    method: "Row Level Security (RLS)",
    implementation: "Database-level access control",
    granularity: "Row and column level"
  },
  dataProtection: {
    encryption: "AES-256 at rest, TLS 1.3 in transit",
    backup: "Automated encrypted backups",
    compliance: ["GDPR", "CCPA", "HIPAA-ready"]
  },
  apiSecurity: {
    rateLimit: "Configurable per endpoint",
    validation: "Zod schema validation",
    monitoring: "Real-time security alerts"
  }
};
```

This architecture provides a solid foundation for building a scalable, secure, and performant local services marketplace that can grow from startup to enterprise scale.
