# 🏗️ Neza Layout & Components Guide - Systematic UI Architecture

## Strategic Purpose: Comprehensive Component System for Consistent Premium Experience

**Objective**: Define reusable layout patterns and UI components that ensure consistency, accessibility, and premium quality across all platform interfaces.

---

## 📐 LAYOUT SYSTEM FOUNDATION

### Grid System & Spacing
```css
/* 8px Grid System - All spacing must be multiples of 8px */
--space-1: 0.25rem;  /* 4px - Micro spacing */
--space-2: 0.5rem;   /* 8px - Base unit */
--space-3: 0.75rem;  /* 12px - Small spacing */
--space-4: 1rem;     /* 16px - Standard spacing */
--space-6: 1.5rem;   /* 24px - Medium spacing */
--space-8: 2rem;     /* 32px - Large spacing */
--space-12: 3rem;    /* 48px - XL spacing */
--space-16: 4rem;    /* 64px - XXL spacing */
--space-20: 5rem;    /* 80px - Section spacing */
--space-24: 6rem;    /* 96px - Page spacing */
```

### Responsive Breakpoints
```css
/* Mobile-First Breakpoint System */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small desktops */
--breakpoint-xl: 1280px;  /* Large desktops */
--breakpoint-2xl: 1536px; /* Extra large screens */

/* Tailwind Breakpoint Usage */
.responsive-container {
  @apply px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16;
  @apply max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl;
}
```

### Container & Layout Rules
```tsx
// Page Container Pattern
<div className="min-h-screen bg-neutral-0">
  <Header />
  <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Page content */}
  </main>
  <Footer />
</div>

// Section Container Pattern
<section className="py-12 lg:py-20">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      {/* Section content */}
    </div>
  </div>
</section>

// Card Grid Pattern
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

---

## 🎯 CORE UI COMPONENTS

### Button System
```tsx
// Primary Button Component
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ variant, size, disabled, loading, children }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500",
    secondary: "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 focus:ring-neutral-500",
    outline: "border border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    ghost: "text-primary-600 hover:bg-primary-50 focus:ring-primary-500"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg"
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled || loading}
    >
      {loading && <Spinner className="mr-2" />}
      {children}
    </button>
  )
}

// Usage Examples
<Button variant="primary" size="lg">Book Service</Button>
<Button variant="outline" size="md">View Details</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

### Input System
```tsx
// Input Component with Label and Error States
interface InputProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number'
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({ label, type = 'text', placeholder, error, required, disabled }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-3 py-2.5 border rounded-lg text-base
          placeholder:text-neutral-400
          focus:outline-none focus:ring-2 focus:ring-offset-1
          disabled:bg-neutral-100 disabled:cursor-not-allowed
          ${error 
            ? 'border-error-500 focus:ring-error-500' 
            : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'
          }
        `}
      />
      {error && (
        <p className="text-sm text-error-600 flex items-center">
          <ExclamationIcon className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}
```

### Card System
```tsx
// Card Component with Multiple Variants
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  padding?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ variant = 'default', padding = 'md', children, className }) => {
  const baseClasses = "rounded-xl transition-all duration-200"
  
  const variants = {
    default: "bg-white border border-neutral-200",
    elevated: "bg-white shadow-lg hover:shadow-xl",
    outlined: "bg-white border-2 border-neutral-300",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg"
  }
  
  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  }
  
  return (
    <div className={`${baseClasses} ${variants[variant]} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  )
}

// Service Card Example
<Card variant="elevated" padding="md" className="hover:scale-105">
  <div className="flex items-start space-x-4">
    <img src="/service-image.jpg" alt="Service" className="w-16 h-16 rounded-lg object-cover" />
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-neutral-800">Home Cleaning</h3>
      <p className="text-sm text-neutral-600 mt-1">Professional cleaning service</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-lg font-bold text-primary-600">$50/hour</span>
        <Button variant="primary" size="sm">Book Now</Button>
      </div>
    </div>
  </div>
</Card>
```

---

## 🎨 ADVANCED COMPONENTS

### Modal System
```tsx
// Modal Component with Backdrop and Animation
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, size = 'md', children }) => {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative w-full ${sizes[size]} bg-white rounded-xl shadow-2xl`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-800">{title}</h2>
            <button 
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Alert System
```tsx
// Alert Component for Status Messages
interface AlertProps {
  type: 'success' | 'warning' | 'error' | 'info'
  title?: string
  message: string
  dismissible?: boolean
  onDismiss?: () => void
}

const Alert: React.FC<AlertProps> = ({ type, title, message, dismissible, onDismiss }) => {
  const styles = {
    success: {
      container: "bg-success-50 border border-success-200",
      icon: "text-success-500",
      title: "text-success-800",
      message: "text-success-700"
    },
    warning: {
      container: "bg-warning-50 border border-warning-200",
      icon: "text-warning-500",
      title: "text-warning-800",
      message: "text-warning-700"
    },
    error: {
      container: "bg-error-50 border border-error-200",
      icon: "text-error-500",
      title: "text-error-800",
      message: "text-error-700"
    },
    info: {
      container: "bg-primary-50 border border-primary-200",
      icon: "text-primary-500",
      title: "text-primary-800",
      message: "text-primary-700"
    }
  }
  
  const currentStyle = styles[type]
  
  return (
    <div className={`rounded-lg p-4 ${currentStyle.container}`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${currentStyle.icon}`}>
          {/* Icon based on type */}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${currentStyle.title}`}>
              {title}
            </h3>
          )}
          <p className={`text-sm ${title ? 'mt-1' : ''} ${currentStyle.message}`}>
            {message}
          </p>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className={`ml-auto flex-shrink-0 ${currentStyle.icon} hover:opacity-75`}
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
```

---

## 🧭 NAVIGATION COMPONENTS

### Header Component
```tsx
// Main Navigation Header
const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Neza" className="h-8 w-auto" />
              <span className="text-xl font-bold text-neutral-800">Neza</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-neutral-600 hover:text-primary-600">
              Browse Services
            </Link>
            <Link href="/become-provider" className="text-neutral-600 hover:text-primary-600">
              Become a Provider
            </Link>
            <Link href="/how-it-works" className="text-neutral-600 hover:text-primary-600">
              How It Works
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="primary" size="sm">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
```

### Footer Component
```tsx
// Site Footer
const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo-white.svg" alt="Neza" className="h-8 w-auto" />
              <span className="text-xl font-bold">Neza</span>
            </div>
            <p className="text-neutral-300 mb-4">
              Your trusted platform for local services. Connect with verified providers 
              and book services instantly.
            </p>
            <div className="flex space-x-4">
              {/* Social media links */}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">For Customers</h3>
            <ul className="space-y-2 text-neutral-300">
              <li><Link href="/services" className="hover:text-white">Browse Services</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/safety" className="hover:text-white">Safety</Link></li>
            </ul>
          </div>
          
          {/* Provider Links */}
          <div>
            <h3 className="font-semibold mb-4">For Providers</h3>
            <ul className="space-y-2 text-neutral-300">
              <li><Link href="/become-provider" className="hover:text-white">Join as Provider</Link></li>
              <li><Link href="/provider-resources" className="hover:text-white">Resources</Link></li>
              <li><Link href="/provider-support" className="hover:text-white">Support</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2024 Neza. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-neutral-400 hover:text-white text-sm">Privacy</Link>
            <Link href="/terms" className="text-neutral-400 hover:text-white text-sm">Terms</Link>
            <Link href="/contact" className="text-neutral-400 hover:text-white text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## 📱 RESPONSIVE DESIGN PATTERNS

### Mobile-First Component Adaptations
```tsx
// Responsive Service Card
<Card className="w-full">
  {/* Mobile Layout */}
  <div className="block sm:hidden">
    <img src="/service.jpg" className="w-full h-48 object-cover rounded-t-lg" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">Service Title</h3>
      <p className="text-sm text-neutral-600 mt-1">Description</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold text-primary-600">$50/hr</span>
        <Button variant="primary" size="sm" className="w-24">Book</Button>
      </div>
    </div>
  </div>
  
  {/* Desktop Layout */}
  <div className="hidden sm:flex items-center space-x-4 p-6">
    <img src="/service.jpg" className="w-20 h-20 object-cover rounded-lg" />
    <div className="flex-1">
      <h3 className="text-xl font-semibold">Service Title</h3>
      <p className="text-neutral-600 mt-1">Description</p>
    </div>
    <div className="text-right">
      <span className="text-2xl font-bold text-primary-600">$50/hr</span>
      <Button variant="primary" size="md" className="mt-2 w-32">Book Now</Button>
    </div>
  </div>
</Card>
```

---

## 🔍 COMPONENT QUALITY CHECKLIST

### Accessibility Requirements
- [ ] **Keyboard Navigation**: All interactive elements accessible via keyboard
- [ ] **Screen Reader Support**: Proper ARIA labels and semantic HTML
- [ ] **Focus Management**: Clear focus indicators and logical tab order
- [ ] **Color Independence**: Information not conveyed by color alone
- [ ] **Touch Targets**: Minimum 44px touch targets for mobile

### Performance Requirements
- [ ] **Lazy Loading**: Images and heavy components load on demand
- [ ] **Bundle Size**: Components optimized for minimal bundle impact
- [ ] **Render Performance**: Smooth animations and interactions
- [ ] **Memory Usage**: No memory leaks in component lifecycle
- [ ] **Loading States**: Appropriate loading indicators for async operations

---

**Layout & Components Commitment**: Every component must be accessible, performant, and consistent with the premium design system while supporting all responsive breakpoints.**
