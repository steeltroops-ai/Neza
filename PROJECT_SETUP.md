# Neza Project Setup Guide

This document provides step-by-step instructions for setting up the Neza platform development environment.

## Frontend Setup (Next.js)

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- Git

### Step 1: Initialize Next.js Project

```bash
# Create a new Next.js project with TypeScript
npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir

# Navigate to the project directory
cd frontend

# Install additional dependencies
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot @radix-ui/react-toast
npm install class-variance-authority clsx tailwind-merge lucide-react
npm install zustand @tanstack/react-query axios date-fns zod react-hook-form
npm install next-themes next-intl
```

### Step 2: Set Up shadcn/ui Components

```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add commonly used components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add calendar
```

### Step 3: Configure Project Structure

Create the following directory structure:

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── verify/
│   │   ├── (dashboard)/
│   │   │   ├── client/
│   │   │   └── provider/
│   │   ├── (main)/
│   │   │   ├── services/
│   │   │   └── providers/
│   │   ├── api/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── forms/
│   │   ├── layout/
│   │   └── shared/
│   ├── hooks/
│   ├── lib/
│   ├── store/
│   └── types/
├── public/
└── package.json
```

## Backend Setup (NestJS)

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- PostgreSQL
- Redis (optional for caching)

### Step 1: Initialize NestJS Project

```bash
# Install NestJS CLI
npm i -g @nestjs/cli

# Create a new NestJS project
nest new backend

# Navigate to the project directory
cd backend

# Install additional dependencies
npm install @nestjs/config @nestjs/swagger @nestjs/throttler
npm install @prisma/client prisma
npm install class-validator class-transformer
npm install bcrypt jsonwebtoken
npm install --save-dev @types/bcrypt @types/jsonwebtoken
```

### Step 2: Set Up Prisma

```bash
# Initialize Prisma
npx prisma init

# After configuring your schema, generate Prisma client
npx prisma generate
```

### Step 3: Configure Project Structure

Create the following directory structure:

```
backend/
├── src/
│   ├── auth/
│   ├── users/
│   ├── services/
│   ├── bookings/
│   ├── payments/
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── config/
│   └── main.ts
├── prisma/
│   └── schema.prisma
└── package.json
```

## Database Setup

### Step 1: Create PostgreSQL Database

```bash
# Using psql command line
psql -U postgres

# Create database
CREATE DATABASE neza_db;

# Create user (optional)
CREATE USER neza_user WITH ENCRYPTED PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE neza_db TO neza_user;
```

### Step 2: Configure Environment Variables

Create `.env` files for both frontend and backend:

**Backend .env**
```
DATABASE_URL="postgresql://neza_user:your_password@localhost:5432/neza_db?schema=public"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRATION="1d"
NODE_ENV="development"
PORT=3001
```

**Frontend .env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Running the Development Environment

### Backend

```bash
# Start development server
cd backend
npm run start:dev
```

### Frontend

```bash
# Start development server
cd frontend
npm run dev
```

## Setting Up Git Repository

```bash
# Initialize Git repository
git init

# Create .gitignore file
cat > .gitignore << EOL
# dependencies
node_modules/
.pnp/
.pnp.js

# testing
coverage/

# next.js
.next/
out/

# production
build/
dist/

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOL

# Initial commit
git add .
git commit -m "Initial project setup"
```

## Next Steps

After completing the setup:

1. Configure authentication system (OTP-based)
2. Set up the database schema with Prisma
3. Create basic UI components
4. Implement API structure
5. Set up deployment pipeline

Refer to the MVP Development Plan for the complete task list and priorities.