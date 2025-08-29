# ✨ Neza Microinteractions & Animation Guide - Delightful User Experience

## Strategic Purpose: Animation System for Premium User Engagement and Feedback

**Objective**: Create sophisticated animation patterns that enhance usability, provide feedback, and create emotional connections while maintaining performance.

---

## 🎯 ANIMATION PHILOSOPHY & PRINCIPLES

### Core Animation Principles
1. **Purposeful Motion**: Every animation serves a functional purpose (feedback, guidance, or delight)
2. **Natural Physics**: Animations follow real-world physics with spring-based easing
3. **Performance First**: Smooth 60fps animations that don't impact core functionality
4. **Accessibility Aware**: Respect user preferences for reduced motion
5. **Brand Reinforcement**: Animations reinforce trust, premium quality, and local connection

### Animation Personality
- **Confident**: Smooth, decisive movements that inspire trust
- **Premium**: Sophisticated timing and easing that feels high-quality
- **Friendly**: Gentle, welcoming animations that feel approachable
- **Efficient**: Quick, purposeful animations that don't waste time

---

## ⚡ FRAMER MOTION CONFIGURATION

### Base Animation Setup
```tsx
// framer-motion.config.ts
import { Variants, Transition } from 'framer-motion'

// Standard easing curves
export const easings = {
  smooth: [0.25, 0.1, 0.25, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  sharp: [0.4, 0, 0.2, 1],
  gentle: [0.25, 0.46, 0.45, 0.94]
}

// Standard durations
export const durations = {
  fast: 0.15,      // Quick feedback (hover, focus)
  normal: 0.3,     // Standard transitions
  slow: 0.5,       // Complex animations
  page: 0.8        // Page transitions
}

// Spring configurations
export const springs = {
  gentle: { type: "spring", stiffness: 300, damping: 30 },
  bouncy: { type: "spring", stiffness: 400, damping: 25 },
  snappy: { type: "spring", stiffness: 500, damping: 35 }
}
```

### Reduced Motion Support
```tsx
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react'

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return prefersReducedMotion
}

// Usage in components
const AnimatedComponent = () => {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      transition={prefersReducedMotion ? { duration: 0 } : springs.gentle}
    >
      Content
    </motion.div>
  )
}
```

---

## 🎨 CORE MICROINTERACTIONS

### Button Interactions
```tsx
// Premium Button with Microinteractions
const AnimatedButton: React.FC<ButtonProps> = ({ children, variant, ...props }) => {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.button
      className={`button-${variant}`}
      whileHover={!prefersReducedMotion ? { 
        scale: 1.02,
        boxShadow: "0 8px 25px rgba(14, 165, 233, 0.15)"
      } : {}}
      whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
      transition={springs.snappy}
      {...props}
    >
      <motion.span
        initial={{ opacity: 1 }}
        whileHover={!prefersReducedMotion ? { opacity: 0.9 } : {}}
        transition={{ duration: durations.fast }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}

// Loading Button State
const LoadingButton: React.FC = ({ loading, children }) => {
  return (
    <motion.button
      disabled={loading}
      animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
      transition={{ duration: durations.fast }}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2"
          >
            <Spinner />
            <span>Processing...</span>
          </motion.div>
        ) : (
          <motion.span
            key="content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
```

### Form Input Interactions
```tsx
// Animated Input with Focus States
const AnimatedInput: React.FC<InputProps> = ({ label, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  
  return (
    <div className="relative">
      {/* Floating Label */}
      <motion.label
        className="absolute left-3 text-neutral-500 pointer-events-none"
        animate={{
          y: isFocused || hasValue ? -24 : 8,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? '#0ea5e9' : error ? '#ef4444' : '#737373'
        }}
        transition={springs.gentle}
      >
        {label}
      </motion.label>
      
      {/* Input Field */}
      <motion.input
        className="w-full px-3 py-3 border rounded-lg bg-transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false)
          setHasValue(e.target.value.length > 0)
        }}
        animate={{
          borderColor: isFocused ? '#0ea5e9' : error ? '#ef4444' : '#d4d4d4'
        }}
        transition={{ duration: durations.fast }}
        {...props}
      />
      
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-error-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
```

### Card Hover Effects
```tsx
// Service Card with Premium Hover Effects
const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      className="bg-white rounded-xl border border-neutral-200 overflow-hidden cursor-pointer"
      whileHover={!prefersReducedMotion ? {
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
      } : {}}
      transition={springs.gentle}
    >
      {/* Image with Overlay Effect */}
      <div className="relative overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-48 object-cover"
          whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
          transition={{ duration: durations.slow }}
        />
        
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: durations.normal }}
        />
        
        {/* Verified Badge */}
        <motion.div
          className="absolute top-3 right-3 bg-success-500 text-white px-2 py-1 rounded-full text-xs font-medium"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, ...springs.bouncy }}
        >
          ✓ Verified
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-2">
          {service.title}
        </h3>
        <p className="text-neutral-600 text-sm mb-4">
          {service.description}
        </p>
        
        {/* Price and Rating */}
        <div className="flex items-center justify-between">
          <motion.span
            className="text-xl font-bold text-primary-600"
            whileHover={{ scale: 1.05 }}
            transition={springs.snappy}
          >
            ${service.price}/hr
          </motion.span>
          
          <div className="flex items-center space-x-1">
            <StarIcon className="w-4 h-4 text-warning-500" />
            <span className="text-sm font-medium">{service.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
```

---

## 🎉 SUCCESS & CELEBRATION ANIMATIONS

### Booking Confirmation Animation
```tsx
// Success Animation for Completed Bookings
const BookingSuccess: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false)
  
  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <motion.div
      className="text-center py-12"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springs.bouncy}
    >
      {/* Success Icon */}
      <motion.div
        className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, ...springs.bouncy }}
      >
        <motion.svg
          className="w-10 h-10 text-white"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
      
      {/* Success Message */}
      <motion.h2
        className="text-2xl font-bold text-neutral-800 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Booking Confirmed!
      </motion.h2>
      
      <motion.p
        className="text-neutral-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Your service has been successfully booked
      </motion.p>
      
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && <ConfettiAnimation />}
      </AnimatePresence>
    </motion.div>
  )
}

// Confetti Component
const ConfettiAnimation: React.FC = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => i)
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece}
          className="absolute w-2 h-2 bg-primary-500 rounded"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            rotate: 0,
            opacity: 1
          }}
          animate={{
            y: window.innerHeight + 10,
            rotate: 360,
            opacity: 0
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            ease: "linear",
            delay: Math.random() * 0.5
          }}
          style={{
            backgroundColor: ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 4)]
          }}
        />
      ))}
    </div>
  )
}
```

### Progress Indicators
```tsx
// Animated Progress Bar
const ProgressBar: React.FC<{ progress: number; label?: string }> = ({ progress, label }) => {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm text-neutral-600 mb-2">
          <span>{label}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      
      <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// Multi-step Progress Indicator
const StepProgress: React.FC<{ currentStep: number; totalSteps: number; steps: string[] }> = ({ 
  currentStep, 
  totalSteps, 
  steps 
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {/* Step Circle */}
          <motion.div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
              ${index < currentStep 
                ? 'bg-success-500 text-white' 
                : index === currentStep 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-neutral-200 text-neutral-500'
              }
            `}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: index === currentStep ? 1.1 : 1,
              opacity: 1
            }}
            transition={springs.gentle}
          >
            {index < currentStep ? '✓' : index + 1}
          </motion.div>
          
          {/* Step Label */}
          <span className={`
            ml-2 text-sm font-medium
            ${index <= currentStep ? 'text-neutral-800' : 'text-neutral-400'}
          `}>
            {step}
          </span>
          
          {/* Connector Line */}
          {index < totalSteps - 1 && (
            <motion.div
              className="flex-1 h-0.5 mx-4 bg-neutral-200 overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: index < currentStep ? 1 : 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ originX: 0 }}
            >
              <div className="h-full bg-success-500" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}
```

---

## 🔄 PAGE TRANSITIONS

### Route Transitions
```tsx
// Page transition wrapper
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion) {
    return <>{children}</>
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: durations.normal, ease: easings.smooth }}
    >
      {children}
    </motion.div>
  )
}

// Staggered list animations
const StaggeredList: React.FC<{ children: React.ReactNode[] }> = ({ children }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

---

## 📱 MOBILE-SPECIFIC ANIMATIONS

### Touch Feedback
```tsx
// Mobile touch feedback for cards
const TouchFeedbackCard: React.FC = ({ children, onTap }) => {
  return (
    <motion.div
      className="bg-white rounded-lg border border-neutral-200 p-4"
      whileTap={{ scale: 0.98, opacity: 0.8 }}
      transition={{ duration: 0.1 }}
      onTap={onTap}
    >
      {children}
    </motion.div>
  )
}

// Pull-to-refresh animation
const PullToRefresh: React.FC = ({ onRefresh }) => {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  return (
    <motion.div
      className="relative"
      drag="y"
      dragConstraints={{ top: 0, bottom: 100 }}
      onDrag={(_, info) => setPullDistance(Math.max(0, info.offset.y))}
      onDragEnd={() => {
        if (pullDistance > 60) {
          setIsRefreshing(true)
          onRefresh().finally(() => setIsRefreshing(false))
        }
        setPullDistance(0)
      }}
    >
      {/* Pull indicator */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
        animate={{ opacity: pullDistance > 20 ? 1 : 0 }}
      >
        <RefreshIcon className="w-6 h-6 text-primary-500" />
      </motion.div>
      
      {/* Content */}
      <motion.div
        animate={{ y: pullDistance * 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Page content */}
      </motion.div>
    </motion.div>
  )
}
```

---

## 🔍 ANIMATION PERFORMANCE GUIDELINES

### Performance Best Practices
```tsx
// Use transform and opacity for smooth animations
const PerformantAnimation = () => (
  <motion.div
    // ✅ Good - uses transform (GPU accelerated)
    animate={{ x: 100, scale: 1.1, opacity: 0.8 }}
    // ❌ Avoid - causes layout recalculation
    // animate={{ width: 200, height: 100, marginLeft: 50 }}
  />
)

// Optimize with will-change for complex animations
const OptimizedComponent = () => (
  <motion.div
    style={{ willChange: 'transform' }}
    animate={{ x: [0, 100, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
  />
)

// Use layout animations sparingly
const LayoutAnimation = () => (
  <motion.div
    layout // Only use when necessary
    className="bg-white p-4 rounded-lg"
  >
    Content that might change size
  </motion.div>
)
```

### Animation Quality Checklist
- [ ] **60fps Performance**: All animations run smoothly at 60fps
- [ ] **Reduced Motion Support**: Respects user accessibility preferences
- [ ] **Purpose-Driven**: Every animation serves a functional purpose
- [ ] **Consistent Timing**: Uses standardized duration and easing values
- [ ] **Mobile Optimized**: Touch-friendly interactions and appropriate feedback

---

**Animation Commitment**: Every animation must enhance usability and create delight while maintaining optimal performance and accessibility compliance.**
