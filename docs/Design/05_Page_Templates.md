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
    <section className="from-primary-50 relative bg-gradient-to-br to-white py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-4xl font-bold leading-tight text-neutral-800 lg:text-6xl">
              Your Local Services,
              <span className="text-primary-600"> Instantly Booked</span>
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-neutral-600">
              Connect with verified service providers in your area. Book instantly, pay securely,
              and get the job done right.
            </p>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
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
                <CheckIcon className="text-success-500 h-5 w-5" />
                <span>Verified Providers</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldIcon className="text-success-500 h-5 w-5" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon className="text-warning-500 h-5 w-5" />
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
              className="h-auto w-full rounded-2xl shadow-2xl"
            />

            {/* Floating Cards */}
            <motion.div
              className="absolute -left-4 -top-4 rounded-xl bg-white p-4 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-success-500 flex h-10 w-10 items-center justify-center rounded-full">
                  <CheckIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Booking Confirmed</p>
                  <p className="text-xs text-neutral-500">Home Cleaning • Today 2PM</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
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
    { name: 'Events', icon: '🎉', count: '90+ providers' },
  ];

  return (
    <section className="bg-neutral-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-800">Popular Service Categories</h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            Discover trusted professionals across all service categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer rounded-xl bg-white p-6 text-center transition-shadow hover:shadow-lg"
            >
              <div className="mb-3 text-4xl">{category.icon}</div>
              <h3 className="mb-1 font-semibold text-neutral-800">{category.name}</h3>
              <p className="text-sm text-neutral-500">{category.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## 🔐 AUTHENTICATION PAGES TEMPLATE

### Login/Signup Layout

```tsx
// Authentication Page Template
const AuthTemplate: React.FC<{ type: 'login' | 'signup' }> = ({ type }) => {
  return (
    <div className="from-primary-50 flex min-h-screen items-center justify-center bg-gradient-to-br to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="mb-8 inline-block">
            <img src="/logo.svg" alt="Neza" className="mx-auto h-12 w-auto" />
          </Link>

          <h2 className="text-3xl font-bold text-neutral-800">
            {type === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-neutral-600">
            {type === 'login'
              ? 'Sign in to your account to continue'
              : 'Join thousands of satisfied customers'}
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

            <Input label="Email Address" type="email" required placeholder="you@example.com" />

            <Input label="Password" type="password" required placeholder="••••••••" />

            {type === 'signup' && (
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="text-primary-600 focus:ring-primary-500 mt-1 h-4 w-4 rounded border-neutral-300"
                />
                <label htmlFor="terms" className="text-sm text-neutral-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary-600 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary-600 hover:underline">
                    Privacy Policy
                  </Link>
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
              <span className="bg-white px-2 text-neutral-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="md" className="w-full">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Google
            </Button>
            <Button variant="outline" size="md" className="w-full">
              <FacebookIcon className="mr-2 h-5 w-5" />
              Facebook
            </Button>
          </div>
        </Card>

        {/* Footer Links */}
        <div className="text-center">
          <p className="text-neutral-600">
            {type === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <Link
              href={type === 'login' ? '/signup' : '/login'}
              className="text-primary-600 font-medium hover:underline"
            >
              {type === 'login' ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
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
      <section className="border-b border-neutral-200 bg-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-2xl font-bold text-neutral-800">Find Local Services</h1>

            {/* Search Bar */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <Input placeholder="What service do you need?" className="h-12" />
              </div>
              <div className="md:w-64">
                <Input placeholder="Enter your location" className="h-12" />
              </div>
              <Button variant="primary" size="lg" className="md:w-32">
                Search
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              {['All Services', 'Home Cleaning', 'Repairs', 'Health', 'Tutoring'].map(filter => (
                <button
                  key={filter}
                  className="hover:border-primary-500 hover:text-primary-600 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm transition-colors"
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
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Filters Sidebar */}
            <aside className="flex-shrink-0 lg:w-64">
              <Card padding="md" className="sticky top-24">
                <h3 className="mb-4 font-semibold text-neutral-800">Filters</h3>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {['$0 - $25', '$25 - $50', '$50 - $100', '$100+'].map(range => (
                      <label key={range} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {[5, 4, 3].map(rating => (
                      <label key={rating} className="flex items-center">
                        <input type="radio" name="rating" className="mr-2" />
                        <div className="flex items-center">
                          {Array.from({ length: rating }).map((_, i) => (
                            <StarIcon key={i} className="text-warning-500 h-4 w-4" />
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
              <div className="mb-6 flex items-center justify-between">
                <p className="text-neutral-600">Showing 24 of 156 services</p>
                <select className="rounded-lg border border-neutral-300 px-3 py-2 text-sm">
                  <option>Sort by: Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                  <option>Distance</option>
                </select>
              </div>

              {/* Service Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {/* Service cards would be mapped here */}
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  {[1, 2, 3, 4, 5].map(page => (
                    <Button
                      key={page}
                      variant={page === 1 ? 'primary' : 'ghost'}
                      size="sm"
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </nav>
              </div>
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
```

---

## 📅 BOOKING FLOW TEMPLATE

### Multi-Step Booking Process

```tsx
// Booking Flow Template
const BookingFlowTemplate: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Service Details', 'Date & Time', 'Payment', 'Confirmation'];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Progress Indicator */}
          <StepProgress currentStep={currentStep} totalSteps={steps.length} steps={steps} />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
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
                      <h2 className="mb-6 text-xl font-semibold">Service Details</h2>
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
                      <h2 className="mb-6 text-xl font-semibold">Select Date & Time</h2>
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
                      <h2 className="mb-6 text-xl font-semibold">Payment Information</h2>
                      {/* Payment form */}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between border-t border-neutral-200 pt-6">
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
                <h3 className="mb-4 font-semibold text-neutral-800">Booking Summary</h3>

                {/* Service Info */}
                <div className="mb-4 flex items-start space-x-3">
                  <img
                    src="/service-image.jpg"
                    alt="Service"
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-800">Home Cleaning</h4>
                    <p className="text-sm text-neutral-600">Professional cleaning service</p>
                  </div>
                </div>

                {/* Provider Info */}
                <div className="mb-6 flex items-center space-x-3 rounded-lg bg-neutral-50 p-3">
                  <img
                    src="/provider-avatar.jpg"
                    alt="Provider"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-neutral-800">Sarah Johnson</p>
                    <div className="flex items-center">
                      <StarIcon className="text-warning-500 mr-1 h-4 w-4" />
                      <span className="text-sm text-neutral-600">4.9 (127 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>$80.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Platform fee</span>
                    <span>$8.00</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-200 pt-2 font-semibold">
                    <span>Total</span>
                    <span>$88.00</span>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex items-center">
                    <ShieldIcon className="text-success-500 mr-2 h-4 w-4" />
                    <span>Secure payment with escrow protection</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="text-success-500 mr-2 h-4 w-4" />
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
  );
};
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

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Navigation */}
          <aside className="flex-shrink-0 lg:w-64">
            <Card padding="md">
              <nav className="space-y-2">
                {[
                  { name: 'Dashboard', icon: '📊', active: true },
                  { name: 'My Bookings', icon: '📅', active: false },
                  { name: 'Favorites', icon: '❤️', active: false },
                  { name: 'Payment Methods', icon: '💳', active: false },
                  { name: 'Settings', icon: '⚙️', active: false },
                ].map(item => (
                  <a
                    key={item.name}
                    href="#"
                    className={`
                      flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                      ${
                        item.active
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
              <h1 className="mb-2 text-2xl font-bold text-neutral-800">Welcome back, John!</h1>
              <p className="text-neutral-600">Here's what's happening with your services</p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card padding="md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-neutral-800">24</p>
                  </div>
                  <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-lg">
                    <CalendarIcon className="text-primary-600 h-6 w-6" />
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Amount Spent</p>
                    <p className="text-2xl font-bold text-neutral-800">$1,240</p>
                  </div>
                  <div className="bg-success-100 flex h-12 w-12 items-center justify-center rounded-lg">
                    <DollarIcon className="text-success-600 h-6 w-6" />
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Favorite Providers</p>
                    <p className="text-2xl font-bold text-neutral-800">8</p>
                  </div>
                  <div className="bg-warning-100 flex h-12 w-12 items-center justify-center rounded-lg">
                    <HeartIcon className="text-warning-600 h-6 w-6" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card padding="md">
              <h2 className="mb-4 text-lg font-semibold text-neutral-800">Recent Bookings</h2>

              <div className="space-y-4">
                {/* Booking items would be mapped here */}
                <div className="flex items-center justify-between rounded-lg bg-neutral-50 p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src="/service-icon.jpg"
                      alt="Service"
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-neutral-800">Home Cleaning</h3>
                      <p className="text-sm text-neutral-600">Today at 2:00 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-success-100 text-success-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                      Confirmed
                    </span>
                    <p className="mt-1 text-sm text-neutral-600">$80.00</p>
                  </div>
                </div>
              </div>
            </Card>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
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

**Page Template Commitment**: Every template must provide a consistent, accessible, and high-performing foundation for feature development while supporting the premium brand experience.\*\*
