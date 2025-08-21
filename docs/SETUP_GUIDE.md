# 🚀 Neza Platform - Setup Guide

## 📋 **QUICK START**

This guide will help you set up the Neza platform locally with all required services.

## 🛠️ **PREREQUISITES**

### Required Software
- **Bun 1.2+** (recommended) - [Install from bun.sh](https://bun.sh)
- **Node.js 18+** (alternative to Bun)
- **Git** for version control

### Required Accounts (Free Tiers Available)
- **Clerk** - [clerk.com](https://clerk.com) for authentication
- **Supabase** - [supabase.com](https://supabase.com) for database
- **Stripe** - [stripe.com](https://stripe.com) for payments

## 🔐 **STEP 1: CLERK AUTHENTICATION SETUP**

### 1.1 Create Clerk Account
1. Go to [clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Choose "Next.js" as your framework
4. Note down your API keys

### 1.2 Configure Clerk
1. In your Clerk dashboard, go to **API Keys**
2. Copy the **Publishable Key** and **Secret Key**
3. Update `.env.local` with your keys:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_key_here
```

### 1.3 Configure Authentication Settings
In your Clerk dashboard:

1. **User & Authentication** → **Email, Phone, Username**
   - Enable Email addresses (required)
   - Enable Phone numbers (optional)
   - Set Email as primary identifier

2. **User & Authentication** → **Social Connections**
   - Enable Google (recommended)
   - Enable GitHub (optional)
   - Enable Apple (optional for mobile)

3. **User & Authentication** → **Multi-factor**
   - Enable SMS verification
   - Enable Authenticator apps

4. **Customization** → **Appearance**
   - Choose "Dark" or "Light" theme to match your preference
   - The components will automatically match our design system

## 🗄️ **STEP 2: SUPABASE DATABASE SETUP**

### 2.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Choose a region close to your users
4. Note down your project URL and API keys

### 2.2 Configure Supabase
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the **Project URL** and **anon public** key
3. Update `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2.3 Database Schema Setup
1. Go to **SQL Editor** in your Supabase dashboard
2. Run the following SQL to create the initial schema:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('CLIENT', 'PROVIDER', 'ADMIN');
CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (clerk_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (clerk_id = auth.jwt() ->> 'sub');
```

## 💳 **STEP 3: STRIPE PAYMENTS SETUP**

### 3.1 Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and sign up
2. Complete account verification
3. Switch to **Test mode** for development

### 3.2 Configure Stripe
1. In your Stripe dashboard, go to **Developers** → **API keys**
2. Copy the **Publishable key** and **Secret key**
3. Update `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

### 3.3 Setup Webhooks (Optional for now)
1. Go to **Developers** → **Webhooks**
2. Add endpoint: `http://localhost:3001/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy the webhook secret and add to `.env.local`

## 📧 **STEP 4: RESEND EMAIL SETUP**

### 4.1 Create Resend Account
1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email address

### 4.2 Configure Resend
1. In your Resend dashboard, go to **API Keys**
2. Create a new API key
3. Update `.env.local`:

```bash
RESEND_API_KEY=re_your_resend_api_key_here
```

## 🚀 **STEP 5: RUN THE APPLICATION**

### 5.1 Install Dependencies
```bash
# With Bun (recommended)
bun install

# Or with npm
npm install
```

### 5.2 Start Development Server
```bash
# With Bun
bun run dev

# Or with npm
npm run dev
```

### 5.3 Open Application
Open [http://localhost:3001](http://localhost:3001) in your browser.

## ✅ **STEP 6: TEST AUTHENTICATION**

### 6.1 Test Sign Up
1. Click "Sign Up" in the navigation
2. Create a new account with email
3. Verify the authentication flow works

### 6.2 Test Sign In
1. Sign out and try signing in
2. Test social login if configured
3. Verify dashboard access

### 6.3 Test User Management
1. Go to your Clerk dashboard
2. Check if the user appears in **Users**
3. Verify user data is correct

## 🔧 **TROUBLESHOOTING**

### Common Issues

**Clerk Authentication Not Working**
- Check if API keys are correct in `.env.local`
- Ensure the domain is added to Clerk's allowed origins
- Verify middleware configuration

**Supabase Connection Issues**
- Check if project URL and keys are correct
- Ensure RLS policies are properly configured
- Verify database schema is created

**Build Errors**
- Run `bun run type-check` to check TypeScript errors
- Ensure all environment variables are set
- Check if all dependencies are installed

### Getting Help
- Check the [Clerk documentation](https://clerk.com/docs)
- Check the [Supabase documentation](https://supabase.com/docs)
- Open an issue in the project repository

## 🎉 **NEXT STEPS**

Once setup is complete, you can:
1. Explore the premium UI components
2. Test the authentication flows
3. Set up the database schema
4. Configure additional services
5. Start building custom features

The platform is now ready for development! 🚀
