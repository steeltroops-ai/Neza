# 🚀 Neza - Premium Local Services Marketplace

> The Uber for local services - instantly connect with verified service providers through secure booking and escrow payments.

[![CI/CD Pipeline](https://github.com/steeltroops-ai/Neza/actions/workflows/ci.yml/badge.svg)](https://github.com/steeltroops-ai/Neza/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black.svg)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)](https://supabase.com/)
[![Bun](https://img.shields.io/badge/Bun-1.1.34-orange.svg)](https://bun.sh/)

## 🎯 Project Overview

Neza is a **category-defining platform** positioned to become the global infrastructure for local service economies. We're digitalizing the $2.5 trillion global services market through a trust-driven, AI-powered marketplace.

### Key Features

- 🔒 **Secure Escrow Payments** - Protected transactions for peace of mind
- ⚡ **Instant Booking** - Real-time service provider matching
- 🛡️ **Verified Providers** - Comprehensive background checks and verification
- 📱 **Mobile-First Design** - Optimized for all devices
- 🎨 **Premium UI/UX** - Following Neza design system principles

## 🏗️ Repository Structure

```
neza/
├── apps/                    # Applications
│   ├── web/                # Next.js web application
│   ├── admin/              # Admin dashboard (future)
│   └── mobile/             # React Native app (future)
├── packages/               # Shared packages
│   ├── ui/                 # Shared UI components
│   ├── config/             # Configuration and environment
│   ├── database/           # Database client and types
│   └── utils/              # Shared utilities
├── services/               # Backend services
│   ├── api/                # API services (future)
│   └── notifications/      # Notification service (future)
├── infra/                  # Infrastructure
│   ├── supabase/          # Database migrations and config
│   ├── docker/            # Docker configurations
│   └── terraform/         # Infrastructure as code
├── docs/                   # Documentation
│   ├── Design/            # Design system documentation
│   └── Product/           # Product specifications
└── .github/               # GitHub workflows and templates
```

## 🚀 Quick Start

### Prerequisites

- **Bun** >= 1.1.34 (required)
- **Node.js** >= 18.0.0
- **Git**
- **Supabase CLI** (for database management)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/steeltroops-ai/Neza.git
   cd Neza
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up Supabase (Local Development)**

   ```bash
   # Install Supabase CLI
   bun add -g @supabase/cli

   # Start local Supabase
   cd infra/supabase
   supabase start

   # Run migrations
   supabase db push
   ```

5. **Start development server**

   ```bash
   bun run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Available Scripts

```bash
# Development
bun run dev              # Start development server
bun run dev:safe         # Auto-fix + start development server
bun run build            # Build for production
bun run start            # Start production server

# 🚀 ENTERPRISE AUTO-FIX SYSTEM
bun run auto-fix         # Run comprehensive auto-fix system
bun run quality:fix      # Auto-fix all code quality issues
bun run quality:check    # Check all quality standards
bun run commit:safe      # Auto-fix + safe commit

# Code Quality
bun run lint             # Run ESLint (zero warnings enforced)
bun run lint:fix         # Fix ESLint issues automatically
bun run type-check       # Run TypeScript strict checks
bun run format           # Format code with Prettier
bun run format:check     # Check code formatting

# Security & Performance
bun run security:audit   # Run security vulnerability scan
bun run security:fix     # Auto-fix security vulnerabilities
bun run unused:check     # Check for unused code
bun run unused:remove    # Remove unused imports/exports

# Testing
bun run test             # Run tests
bun run test:watch       # Run tests in watch mode
bun run test:coverage    # Run tests with coverage

# Database
bun run db:generate      # Generate database types
bun run db:migrate       # Run database migrations
bun run db:reset         # Reset database
bun run db:seed          # Seed database with sample data
```

## 🛡️ Enterprise-Grade Quality System

### Real-Time Auto-Fix Features

**Automatic Code Quality Enforcement:**

- ✅ **ESLint Auto-Fix**: Automatically fixes linting errors on save
- ✅ **Prettier Formatting**: Code formatting applied on save/paste/type
- ✅ **Import Organization**: Auto-sorts and removes unused imports
- ✅ **TypeScript Strict Mode**: Zero `any` types, all strict checks enabled
- ✅ **Dead Code Removal**: Automatically removes unused variables/imports

**Pre-Commit Quality Gates:**

- ✅ **Lint-Staged**: Auto-fix staged files before commit
- ✅ **Type Checking**: Ensure TypeScript compliance
- ✅ **Security Audit**: Check for vulnerabilities
- ✅ **Build Verification**: Ensure packages build successfully

**VS Code Integration:**

- ✅ **Format on Save**: Automatic code formatting
- ✅ **Auto-Import**: Intelligent import suggestions
- ✅ **Error Prevention**: Real-time error detection
- ✅ **Accessibility Hints**: WCAG compliance suggestions

### Tech Stack

**Frontend:**

- **Next.js 15+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React 19** - Latest React features

**Backend:**

- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Primary database
- **Row Level Security** - Data security

**Development:**

- **Bun** - Fast JavaScript runtime and package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **GitHub Actions** - CI/CD pipeline

## 🎨 Design System

Neza follows a comprehensive design system based on:

- **Trust-First Architecture** - Every element reinforces security and reliability
- **Premium Aesthetics** - Sophisticated, polished, high-quality design
- **Mobile-First Responsive** - Optimized for all screen sizes
- **Accessibility Compliance** - WCAG 2.1 AA+ standards

See [Design Documentation](./docs/Design/) for detailed guidelines.

## 🗄️ Database Schema

Core entities:

- **Users** - Customer and provider profiles
- **Providers** - Service provider business profiles
- **Services** - Individual services offered
- **Bookings** - Service bookings and transactions
- **Reviews** - Customer feedback and ratings

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**

   ```bash
   # Install Vercel CLI
   bun add -g vercel

   # Deploy
   vercel --prod
   ```

2. **Environment Variables**
   Set up the following in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Environment Configuration

- **Development**: `http://localhost:3000`
- **Staging**: Auto-deployed from `develop` branch
- **Production**: Auto-deployed from `main` branch

## 🧪 Testing Strategy

- **Unit Tests** - Component and utility testing
- **Integration Tests** - API and database integration
- **E2E Tests** - Full user journey testing
- **Performance Tests** - Core Web Vitals monitoring

## 🔒 Security

- **Row Level Security** - Database-level access control
- **Input Validation** - Comprehensive data sanitization
- **HTTPS Everywhere** - Secure communication
- **Regular Security Audits** - Automated vulnerability scanning

## 📈 Performance

- **Core Web Vitals** - LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Optimization** - Code splitting and lazy loading
- **Image Optimization** - Next.js Image component with WebP/AVIF
- **Caching Strategy** - Multi-layer caching implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🆘 Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/steeltroops-ai/Neza/issues)
- **Discussions**: [GitHub Discussions](https://github.com/steeltroops-ai/Neza/discussions)

---

**Built with ❤️ by the Neza Team**
