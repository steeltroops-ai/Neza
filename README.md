# Neza - The Local Services Marketplace

## 🎯 Overview

Neza is a modern, high-performance digital platform designed to connect households and businesses with trusted, local service providers across emerging markets—starting in Uganda, expanding into South Africa, and eventually scaling globally.

In regions where access to reliable services is fragmented, informal, or word-of-mouth-based, Neza creates a formal, trusted ecosystem for discovering, booking, and paying for everyday services like:

- Automotive repairs
- Delivery & logistics
- Pet care & dog walking
- Childcare & tutoring
- Household maintenance
- Skilled trades (plumbers, electricians, etc.)

This two-sided marketplace is built with a mobile-first, secure, and ultra-performant architecture, tailored to local contexts and powered by robust technology and localized payment systems.

## ⚙️ What We're Building

### MVP Scope:

A web-first product (PWA-ready), featuring two main user roles:

- **Clients** – Households or businesses searching for and booking services
- **Providers** – Verified individuals or businesses offering local services

Key MVP features include:

- Seamless onboarding (OTP login)
- Geo-filtered service discovery
- Secure bookings with calendar scheduling
- Localized payment integrations (Flutterwave, Paystack, M-Pesa, MTN, Airtel)
- Escrow-based trust mechanism (pay after job done)
- Ratings, reviews, and verified provider badges
- Digital wallets and earnings dashboards for providers
- Modular and scalable backend for global expansion

## 💡 Problem & Opportunity

In many developing markets, access to reliable, skilled service providers is disorganized and inconsistent. People often rely on personal recommendations or roadside vendors, which limits visibility, consistency, and trust. Simultaneously, talented workers struggle with low visibility, limited demand, or inconsistent income.

Neza formalizes and digitizes this broken ecosystem, providing:

- Visibility to service providers
- Trust and assurance to clients
- Streamlined booking, communication, and payments
- A foundation for future fintech, gig economy, and SaaS extensions

## 💻 Technical Architecture

### Frontend (Web PWA):

- Next.js 14+ (App Router, Edge functions)
- TailwindCSS + shadcn/ui
- TypeScript + Zustand + Framer Motion
- Mobile-first, responsive UX
- SSR and performance optimization

### Backend:

- NestJS + PostgreSQL (via Supabase or Neon)
- Prisma ORM + Redis caching
- OTP Auth (Twilio / Firebase)
- REST APIs with GraphQL expansion planned
- Scalable microservice-ready architecture

### Payments:

- Flutterwave, Paystack, M-Pesa, MTN, Airtel (Uganda-first)
- Stripe (global fallback)
- Escrow logic: fund release on job completion
- Local currencies and mobile money integration

### Infrastructure:

- Hosted via Vercel + Railway/Fly.io
- CI/CD with GitHub Actions
- Analytics via Posthog, monitoring via Sentry

## 🔐 Trust, Safety & UX Focus

- KYC for providers
- Post-job reviews & ratings
- Escrow-based safety net
- Chat only after confirmed bookings
- Optional insurance or verified ID badges for premium providers

## 📈 Growth Strategy

### Initial Launch – Uganda:

- Target boda-boda services, domestic repair, delivery providers
- Collaborate with trade unions, vocational centers, and co-working hubs
- Offer incentives to early adopters (0% fee, visibility boosts)

### Phase 2 – South Africa:

- Tap into skilled freelance economy (electricians, logistics)
- Localize in isiZulu/Xhosa, integrate additional payment flows

### Beyond:

- Launch mobile apps (Flutter / React Native)
- Add premium subscriptions for providers
- Integrate service packages (e.g., home cleaning + repair bundles)
- Launch B2B tools for businesses to manage service contracts

## 💰 Monetization Model

- **Commission**: 5–10% fee per transaction (escrow-based)
- **Subscription**: Premium visibility, analytics, larger service limits
- **Advertising**: Featured providers or promoted listings
- **SaaS Features** (Future): Scheduling tools, CRM, income analytics

## 📊 Vision: The Future of Work Infrastructure in Africa

Neza is more than a marketplace — it's the foundation for a tech-first gig economy ecosystem in regions where such infrastructure is still being built.

In 3 years, Neza aims to:

- Empower 100k+ local workers to earn online and be visible
- Handle millions in transaction volume
- Become the most trusted platform for booking any real-world service in East Africa
- Evolve into a fintech/gig-economy superlayer (wallets, loans, tools, insurance)

## ✅ TL;DR (Executive Summary)

Neza is a modern, scalable local services marketplace built for Africa. Starting in Uganda, it connects clients with trusted service providers via a high-performance digital platform powered by local payments, verified profiles, and an intuitive UX. It unlocks visibility and trust for service providers, and ease + assurance for clients. Long-term, it aims to become the backbone of local freelance work, gig economy tooling, and regional fintech layers.

**PRODUCT NAME**: Neza  
**Tagline**: "Connecting locals to local solutions."

## 🧠 PHILOSOPHY & STRATEGY

### Design Values:

- ⚡ Performance-first (low latency, SSR)
- 📱 Mobile-optimized (first-class experience on low-end Android devices)
- 🔐 Trust-centric (reviews, KYC, escrow)
- 🌍 Local-first (Ugandan & African ecosystem integrations)
- 💡 Scale-ready (modular microservices architecture)
- 🧩 MVP simplicity, no bloat

## 🧱 MVP SCOPE

### 🎯 Core Features
design and 
| For Users (Clients)                 | For Providers                  |
| ----------------------------------- | ------------------------------ |
| Signup/login (phone, email, Google) | Signup/login                   |
| Browse services by category, price  | Create service listings        |
| Filter by rating, distance, price   | Manage schedule & availability |
| Book a service                      | Accept/reject bookings         |
