# 📄 Neza Page Templates - Comprehensive Layout Specifications

## Strategic Purpose: Standardized Page Layouts for Consistent User Experience

**Objective**: Define complete page templates that ensure consistency, optimize conversion, and support scalable development across all platform interfaces.

---

## 🏠 HOMEPAGE TEMPLATE

### Hero Section Layout
```tsx
// Homepage Hero Component
const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-white py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-800 leading-tight mb-6">
              Your Local Services,
              <span className="text-primary-600"> Instantly Booked</span>
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Connect with verified service providers in your area. 
              Book instantly, pay securely, and get the job done right.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="primary" size="lg" className="flex-1 sm:flex-none">
                Find Services
              </Button>
              <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                Become a Provider
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-neutral-500">
              <div className="flex items-center space-x-2">
                <CheckIcon className="w-5 h-5 text-success-500" />
                <span>Verified Providers</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldIcon className="w-5 h-5 text-success-500" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon className="w-5 h-5 text-warning-500" />
                <span>4.8+ Rating</span>
              </div>
            </div>
          </motion.div>
          
          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img 
              src="/hero-image.jpg" 
              alt="Local service providers" 
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            
            {/* Floating Cards */}
            <motion.div
              className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success-500 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Booking Confirmed</p>
                  <p className="text-xs text-neutral-500">Home Cleaning • Today 2PM</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

### Service Categories Section
```tsx
// Popular Categories Component
const CategoriesSection: React.FC = () => {
  const categories = [
    { name: 'Home Cleaning', icon: '🏠', count: '150+ providers' },
    { name: 'Repairs & Maintenance', icon: '🔧', count: '200+ providers' },
    { name: 'Health & Wellness', icon: '💆', count: '80+ providers' },
    { name: 'Tutoring', icon: '📚', count: '120+ providers' },
    { name: 'Pet Services', icon: '🐕', count: '60+ providers' },
    { name: 'Events', icon: '🎉', count: '90+ providers' }
  ]
  
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">
            Popular Service Categories
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover trusted professionals across all service categories
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-neutral-800 mb-1">{category.name}</h3>
              <p className="text-sm text-neutral-500">{category.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 🔐 AUTHENTICATION PAGES TEMPLATE

### Login/Signup Layout
```tsx
// Authentication Page Template
const AuthTemplate: React.FC<{ type: 'login' | 'signup' }> = ({ type }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block mb-8">
            <img src="/logo.svg" alt="Neza" className="h-12 w-auto mx-auto" />
          </Link>
          
          <h2 className="text-3xl font-bold text-neutral-800">
            {type === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-neutral-600">
            {type === 'login' 
              ? 'Sign in to your account to continue' 
              : 'Join thousands of satisfied customers'
            }
          </p>
        </div>
        
        {/* Form Card */}
        <Card variant="elevated" padding="lg">
          <form className="space-y-6">
            {type === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" required />
                <Input label="Last Name" required />
              </div>
            )}
            
            <Input 
              label="Email Address" 
              type="email" 
              required 
              placeholder="you@example.com"
            />
            
            <Input 
              label="Password" 
              type="password" 
              required 
              placeholder="••••••••"
            />
            
            {type === 'signup' && (
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-1 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="terms" className="text-sm text-neutral-600">
                  I agree to the <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>
            )}
            
            <Button variant="primary" size="lg" className="w-full">
              {type === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          
          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">Or continue with</span>
            </div>
          </div>
          
          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="md" className="w-full">
              <GoogleIcon className="w-5 h-5 mr-2" />
              Google
            </Button>
            <Button variant="outline" size="md" className="w-full">
              <FacebookIcon className="w-5 h-5 mr-2" />
              Facebook
            </Button>
          </div>
        </Card>
        
        {/* Footer Links */}
        <div className="text-center">
          <p className="text-neutral-600">
            {type === 'login' ? "Don't have an account? " : "Already have an account? "}
            <Link 
              href={type === 'login' ? '/signup' : '/login'} 
              className="text-primary-600 hover:underline font-medium"
            >
              {type === 'login' ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
```

---

## 🔍 SERVICE DISCOVERY TEMPLATE

### Search & Filter Layout
```tsx
// Service Discovery Page Template
const ServiceDiscoveryTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      {/* Search Hero */}
      <section className="bg-white border-b border-neutral-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-neutral-800 mb-6">
              Find Local Services
            </h1>
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input 
                  placeholder="What service do you need?" 
                  className="h-12"
                />
              </div>
              <div className="md:w-64">
                <Input 
                  placeholder="Enter your location" 
                  className="h-12"
                />
              </div>
              <Button variant="primary" size="lg" className="md:w-32">
                Search
              </Button>
            </div>
            
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              {['All Services', 'Home Cleaning', 'Repairs', 'Health', 'Tutoring'].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 bg-white border border-neutral-300 rounded-full text-sm hover:border-primary-500 hover:text-primary-600 transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <Card padding="md" className="sticky top-24">
                <h3 className="font-semibold text-neutral-800 mb-4">Filters</h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {['$0 - $25', '$25 - $50', '$50 - $100', '$100+'].map((range) => (
                      <label key={range} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Rating */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input type="radio" name="rating" className="mr-2" />
                        <div className="flex items-center">
                          {Array.from({ length: rating }).map((_, i) => (
                            <StarIcon key={i} className="w-4 h-4 text-warning-500" />
                          ))}
                          <span className="ml-1 text-sm">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </Card>
            </aside>
            
            {/* Results Grid */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-neutral-600">
                  Showing 24 of 156 services
                </p>
                <select className="border border-neutral-300 rounded-lg px-3 py-2 text-sm">
                  <option>Sort by: Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                  <option>Distance</option>
                </select>
              </div>
              
              {/* Service Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Service cards would be mapped here */}
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button 
                      key={page}
                      variant={page === 1 ? "primary" : "ghost"} 
                      size="sm"
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm">Next</Button>
                </nav>
              </div>
            </main>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
```

---

## 📅 BOOKING FLOW TEMPLATE

### Multi-Step Booking Process
```tsx
// Booking Flow Template
const BookingFlowTemplate: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const steps = ['Service Details', 'Date & Time', 'Payment', 'Confirmation']
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <StepProgress 
            currentStep={currentStep} 
            totalSteps={steps.length} 
            steps={steps} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card padding="lg">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-xl font-semibold mb-6">Service Details</h2>
                      {/* Service details form */}
                    </motion.div>
                  )}
                  
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-xl font-semibold mb-6">Select Date & Time</h2>
                      {/* Calendar component */}
                    </motion.div>
                  )}
                  
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                      {/* Payment form */}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-neutral-200">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                  >
                    {currentStep === steps.length ? 'Complete Booking' : 'Continue'}
                  </Button>
                </div>
              </Card>
            </div>
            
            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card padding="md" className="sticky top-24">
                <h3 className="font-semibold text-neutral-800 mb-4">Booking Summary</h3>
                
                {/* Service Info */}
                <div className="flex items-start space-x-3 mb-4">
                  <img 
                    src="/service-image.jpg" 
                    alt="Service" 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-800">Home Cleaning</h4>
                    <p className="text-sm text-neutral-600">Professional cleaning service</p>
                  </div>
                </div>
                
                {/* Provider Info */}
                <div className="flex items-center space-x-3 mb-6 p-3 bg-neutral-50 rounded-lg">
                  <img 
                    src="/provider-avatar.jpg" 
                    alt="Provider" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-neutral-800">Sarah Johnson</p>
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-warning-500 mr-1" />
                      <span className="text-sm text-neutral-600">4.9 (127 reviews)</span>
                    </div>
                  </div>
                </div>
                
                {/* Pricing Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>$80.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Platform fee</span>
                    <span>$8.00</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>$88.00</span>
                  </div>
                </div>
                
                {/* Trust Indicators */}
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex items-center">
                    <ShieldIcon className="w-4 h-4 text-success-500 mr-2" />
                    <span>Secure payment with escrow protection</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-success-500 mr-2" />
                    <span>Verified provider with background check</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
```

---

## 📊 DASHBOARD TEMPLATES

### Customer Dashboard Layout
```tsx
// Customer Dashboard Template
const CustomerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card padding="md">
              <nav className="space-y-2">
                {[
                  { name: 'Dashboard', icon: '📊', active: true },
                  { name: 'My Bookings', icon: '📅', active: false },
                  { name: 'Favorites', icon: '❤️', active: false },
                  { name: 'Payment Methods', icon: '💳', active: false },
                  { name: 'Settings', icon: '⚙️', active: false }
                ].map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    className={`
                      flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${item.active 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-neutral-600 hover:bg-neutral-100'
                      }
                    `}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </nav>
            </Card>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-neutral-800 mb-2">
                Welcome back, John!
              </h1>
              <p className="text-neutral-600">
                Here's what's happening with your services
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card padding="md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-neutral-800">24</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
              </Card>
              
              <Card padding="md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Amount Spent</p>
                    <p className="text-2xl font-bold text-neutral-800">$1,240</p>
                  </div>
                  <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                    <DollarIcon className="w-6 h-6 text-success-600" />
                  </div>
                </div>
              </Card>
              
              <Card padding="md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Favorite Providers</p>
                    <p className="text-2xl font-bold text-neutral-800">8</p>
                  </div>
                  <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                    <HeartIcon className="w-6 h-6 text-warning-600" />
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Recent Bookings */}
            <Card padding="md">
              <h2 className="text-lg font-semibold text-neutral-800 mb-4">
                Recent Bookings
              </h2>
              
              <div className="space-y-4">
                {/* Booking items would be mapped here */}
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img 
                      src="/service-icon.jpg" 
                      alt="Service" 
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-neutral-800">Home Cleaning</h3>
                      <p className="text-sm text-neutral-600">Today at 2:00 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                      Confirmed
                    </span>
                    <p className="text-sm text-neutral-600 mt-1">$80.00</p>
                  </div>
                </div>
              </div>
            </Card>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
```

---

## 🔍 TEMPLATE QUALITY CHECKLIST

### Responsive Design Validation
- [ ] **Mobile-First**: All templates work perfectly on mobile devices
- [ ] **Tablet Optimization**: Layouts adapt well to tablet screen sizes
- [ ] **Desktop Enhancement**: Takes advantage of larger screens effectively
- [ ] **Touch-Friendly**: Interactive elements are appropriately sized for touch

### Performance Requirements
- [ ] **Fast Loading**: Templates load quickly with optimized images and code
- [ ] **Smooth Animations**: All animations run at 60fps without jank
- [ ] **Efficient Rendering**: Components render efficiently without unnecessary re-renders
- [ ] **Bundle Optimization**: Templates don't significantly increase bundle size

### Accessibility Compliance
- [ ] **Keyboard Navigation**: All interactive elements accessible via keyboard
- [ ] **Screen Reader Support**: Proper semantic HTML and ARIA labels
- [ ] **Color Contrast**: All text meets WCAG 2.1 AA+ contrast requirements
- [ ] **Focus Management**: Clear focus indicators and logical tab order

---

**Page Template Commitment**: Every template must provide a consistent, accessible, and high-performing foundation for feature development while supporting the premium brand experience.**
