"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Star, 
  Users, 
  Shield, 
  Clock,
  Wrench,
  GraduationCap,
  Scissors,
  Car,
  Utensils,
  Paintbrush,
  CheckCircle,
  ArrowRight,
  Quote,
  Zap,
  Sparkles,
  TrendingUp,
  Heart,
  Award,
  Globe,
  ChevronRight,
  Play,
  Calendar,
  MessageSquare,
  DollarSign,
  Target,
  Briefcase,
  Home
} from "lucide-react";

// Enhanced Service Categories with Modern Design
const categories = [
  {
    id: "home-repair",
    name: "Home & Repair",
    icon: <Home className="w-8 h-8" />,
    count: 1247,
    colorClass: "category-home",
    description: "Plumbing, electrical, and maintenance",
    trending: true,
    avgPrice: "$45/hr"
  },
  {
    id: "cleaning",
    name: "Cleaning",
    icon: <Sparkles className="w-8 h-8" />,
    count: 892,
    colorClass: "category-cleaning",
    description: "House, office, and deep cleaning",
    trending: true,
    avgPrice: "$35/hr"
  },
  {
    id: "education",
    name: "Education & Tutoring",
    icon: <GraduationCap className="w-8 h-8" />,
    count: 756,
    colorClass: "category-education",
    description: "Academic support and skill training",
    trending: false,
    avgPrice: "$25/hr"
  },
  {
    id: "beauty",
    name: "Beauty & Wellness",
    icon: <Scissors className="w-8 h-8" />,
    count: 634,
    colorClass: "category-beauty",
    description: "Hair, nails, massage, and spa",
    trending: false,
    avgPrice: "$55/hr"
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: <Car className="w-8 h-8" />,
    count: 423,
    colorClass: "category-auto",
    description: "Car repair, maintenance, detailing",
    trending: true,
    avgPrice: "$65/hr"
  },
  {
    id: "food",
    name: "Food & Catering",
    icon: <Utensils className="w-8 h-8" />,
    count: 387,
    colorClass: "category-food",
    description: "Personal chef, catering, baking",
    trending: false,
    avgPrice: "$50/hr"
  },
  {
    id: "creative",
    name: "Creative Services",
    icon: <Paintbrush className="w-8 h-8" />,
    count: 298,
    colorClass: "category-creative",
    description: "Design, photography, video",
    trending: false,
    avgPrice: "$75/hr"
  },
  {
    id: "delivery",
    name: "Delivery & Logistics",
    icon: <Briefcase className="w-8 h-8" />,
    count: 512,
    colorClass: "category-other",
    description: "Package delivery, moving, errands",
    trending: true,
    avgPrice: "$20/hr"
  }
];

// Featured Service Providers
const featuredProviders = [
  {
    id: 1,
    name: "Sarah Nakamya",
    service: "Professional House Cleaning",
    rating: 4.9,
    reviews: 147,
    image: "/api/placeholder/80/80",
    location: "Kampala Central",
    price: 35,
    verified: true,
    responseTime: "~30 min",
    completedJobs: 298,
    specialties: ["Deep Cleaning", "Eco-Friendly", "Same Day"]
  },
  {
    id: 2,
    name: "John Mugisha",
    service: "Plumbing & Electrical",
    rating: 4.8,
    reviews: 203,
    image: "/api/placeholder/80/80",
    location: "Ntinda",
    price: 45,
    verified: true,
    responseTime: "~45 min",
    completedJobs: 456,
    specialties: ["Emergency Repair", "Installation", "Maintenance"]
  },
  {
    id: 3,
    name: "Grace Atukunda",
    service: "Math & Science Tutoring",
    rating: 5.0,
    reviews: 89,
    image: "/api/placeholder/80/80",
    location: "Makerere",
    price: 25,
    verified: true,
    responseTime: "~1 hour",
    completedJobs: 124,
    specialties: ["STEM", "University Prep", "Online Classes"]
  },
  {
    id: 4,
    name: "David Ssemwanga",
    service: "Auto Repair & Detailing",
    rating: 4.7,
    reviews: 156,
    image: "/api/placeholder/80/80",
    location: "Industrial Area",
    price: 65,
    verified: true,
    responseTime: "~2 hours",
    completedJobs: 289,
    specialties: ["Engine Repair", "Body Work", "Detailing"]
  }
];

// Trust Statistics
const trustStats = [
  { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Active Users" },
  { icon: <Shield className="w-6 h-6" />, value: "2.5K+", label: "Verified Providers" },
  { icon: <Star className="w-6 h-6" />, value: "4.9/5", label: "Average Rating" },
  { icon: <CheckCircle className="w-6 h-6" />, value: "50K+", label: "Jobs Completed" }
];

// Customer Testimonials
const testimonials = [
  {
    id: 1,
    name: "Alice Namirembe",
    role: "Marketing Manager",
    content: "Neza connected me with the most reliable house cleaner. Professional service and fair pricing. Highly recommend!",
    rating: 5,
    image: "/api/placeholder/60/60",
    location: "Kololo"
  },
  {
    id: 2,
    name: "Robert Kiprotich",
    role: "Business Owner",
    content: "Found an excellent plumber through Neza who fixed our office plumbing issues quickly. Great platform for local services.",
    rating: 5,
    image: "/api/placeholder/60/60",
    location: "Nakasero"
  },
  {
    id: 3,
    name: "Mary Akello",
    role: "Parent",
    content: "The tutor we found helped my daughter improve her grades significantly. The verification process gives me confidence.",
    rating: 5,
    image: "/api/placeholder/60/60",
    location: "Bugolobi"
  }
];

// Enhanced Search Component
const HeroSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Kampala, Uganda");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const locations = [
    "Kampala, Uganda",
    "Entebbe, Uganda",
    "Jinja, Uganda",
    "Cape Town, South Africa",
    "Johannesburg, South Africa"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/services?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(selectedLocation)}`;
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="search-enhanced p-2">
        <div className="flex items-center">
          {/* Location Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:text-primary transition-colors border-r border-gray-200"
            >
              <div className="relative">
                <MapPin className="w-5 h-5 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-xs text-gray-500 font-medium">Location</span>
                <span className="text-gray-900 font-bold">{selectedLocation.split(',')[0]}</span>
              </div>
              <span className="md:hidden text-gray-900 font-bold truncate max-w-20">
                {selectedLocation.split(',')[0]}
              </span>
            </button>

            {showLocationDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 w-72 glass rounded-2xl z-50 overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-3">Choose Location</h3>
                  {locations.map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(location);
                        setShowLocationDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{location}</span>
                      {selectedLocation === location && (
                        <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="What service do you need? (e.g., house cleaning, plumbing)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-lg font-medium"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="btn-primary px-8 py-4 text-lg font-bold rounded-xl flex items-center gap-3 shadow-glow"
          >
            <Search className="w-5 h-5" />
            <span className="hidden sm:block">Find Services</span>
          </button>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {["House Cleaning", "Plumbing", "Tutoring", "Car Repair"].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setSearchQuery(suggestion)}
            className="px-4 py-2 bg-white/80 hover:bg-white border border-gray-200 rounded-full text-gray-700 hover:text-primary transition-all duration-200 font-medium backdrop-blur-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  );
};

// Service Category Card Component
const CategoryCard = ({ category, index }: { category: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -8 }}
    className="group"
  >
    <Link href={`/services/category/${category.id}`}>
      <div className="card-modern p-8 text-center relative overflow-hidden">
        {/* Trending Badge */}
        {category.trending && (
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending
            </div>
          </div>
        )}

        {/* Icon */}
        <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${category.colorClass} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          {category.icon}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-gray-600 mb-4">{category.description}</p>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{category.count} providers</span>
          <span className="font-bold text-primary">{category.avgPrice}</span>
        </div>

        {/* Hover Arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-5 h-5 text-primary" />
        </div>
      </div>
    </Link>
  </motion.div>
);

// Featured Provider Card
const ProviderCard = ({ provider, index }: { provider: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.15 }}
    className="card-premium p-6 group"
  >
    <div className="flex items-start gap-4 mb-4">
      {/* Avatar */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-bold text-white text-xl shadow-lg">
          {provider.name.charAt(0)}
        </div>
        {provider.verified && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-lg">{provider.name}</h3>
        <p className="text-gray-600 mb-2">{provider.service}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-bold text-gray-900">{provider.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({provider.reviews} reviews)</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <MapPin className="w-3 h-3" />
          <span>{provider.location}</span>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        <div className="text-2xl font-bold text-primary">${provider.price}</div>
        <div className="text-sm text-gray-500">per hour</div>
      </div>
    </div>

    {/* Specialties */}
    <div className="flex flex-wrap gap-2 mb-4">
      {provider.specialties.map((specialty: string) => (
        <span
          key={specialty}
          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
        >
          {specialty}
        </span>
      ))}
    </div>

    {/* Stats */}
    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
      <span>{provider.completedJobs} jobs completed</span>
      <span>Responds in {provider.responseTime}</span>
    </div>

    {/* CTA */}
    <div className="flex gap-2">
      <Button className="flex-1 btn-primary">
        Book Now
      </Button>
      <Button variant="outline" size="sm" className="px-4">
        <MessageSquare className="w-4 h-4" />
      </Button>
    </div>
  </motion.div>
);

// Homepage Component
export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient hero-pattern py-20 lg:py-32">
        <div className="container">
          <div className="text-center text-white mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Find Trusted Local
                <span className="block text-gradient-secondary">Service Providers</span>
                Near You
              </h1>
              <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
                Connect with verified professionals for home repairs, cleaning, tutoring, and more. 
                Safe, reliable, and affordable local services in Uganda and beyond.
              </p>
            </motion.div>

            {/* Search Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <HeroSearch />
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {trustStats.map((stat, index) => (
              <div key={index} className="trust-badge">
                <div className="text-primary">{stat.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Browse by <span className="text-gradient">Category</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover trusted service providers across all categories. From home repairs to personal care, 
                we've got you covered.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="btn-primary btn-large">
                View All Categories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Top-Rated <span className="text-gradient">Professionals</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Meet our highest-rated service providers, verified for quality and reliability.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProviders.map((provider, index) => (
              <ProviderCard key={provider.id} provider={provider} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="btn-outline btn-large">
                Browse All Providers
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How <span className="text-gradient">Neza Works</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get the help you need in three simple steps. Safe, fast, and reliable.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-10 h-10" />,
                title: "Search & Browse",
                description: "Find the perfect service provider by location, price, and ratings"
              },
              {
                icon: <Calendar className="w-10 h-10" />,
                title: "Book & Schedule",
                description: "Choose your preferred time and book instantly with secure payment"
              },
              {
                icon: <CheckCircle className="w-10 h-10" />,
                title: "Get It Done",
                description: "Professional service delivered safely with quality guarantee"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-lg animate-float">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 text-lg">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What Our <span className="text-gradient">Customers Say</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real stories from real customers who found amazing service providers through Neza.
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="card-glass p-8 text-center"
              >
                <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
                <p className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-bold text-white text-xl">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 lg:py-32 hero-gradient text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
              Join thousands of satisfied customers who trust Neza for their local service needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link href="/services" className="flex-1">
                <Button className="w-full btn-secondary btn-large shadow-glow-secondary">
                  Find Services
                  <Search className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/providers/signup" className="flex-1">
                <Button variant="outline" className="w-full btn-large border-white text-white hover:bg-white hover:text-primary">
                  Become a Provider
                  <Briefcase className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}