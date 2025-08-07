"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  X, 
  Grid, 
  List, 
  ArrowRight, 
  MapPin, 
  Star, 
  DollarSign,
  Clock,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceCard } from "@/components/ui/service-card";
import { CategoryCard } from "@/components/ui/category-card";
import { TrustBadge } from "@/components/ui/trust-badge";
import { CTAButton } from "@/components/ui/cta-button";

// Enhanced mock data with more realistic African service providers
const mockCategories = [
  { 
    id: "home-repair", 
    name: "Home & Repair", 
    count: 1247,
    icon: "🏠",
    colorClass: "category-home",
    description: "Plumbing, electrical, maintenance",
    trending: true,
    avgPrice: "$45/hr",
    growth: "23%"
  },
  { 
    id: "cleaning", 
    name: "Cleaning Services", 
    count: 892,
    icon: "✨",
    colorClass: "category-cleaning",
    description: "House, office, deep cleaning",
    trending: true,
    avgPrice: "$35/hr",
    growth: "18%"
  },
  { 
    id: "education", 
    name: "Education & Tutoring", 
    count: 756,
    icon: "📚",
    colorClass: "category-education",
    description: "Academic support, languages",
    trending: false,
    avgPrice: "$25/hr"
  },
  { 
    id: "beauty", 
    name: "Beauty & Wellness", 
    count: 634,
    icon: "💅",
    colorClass: "category-beauty",
    description: "Hair, nails, massage, spa",
    trending: false,
    avgPrice: "$55/hr"
  },
  { 
    id: "automotive", 
    name: "Automotive", 
    count: 423,
    icon: "🚗",
    colorClass: "category-auto",
    description: "Car repair, maintenance",
    trending: true,
    avgPrice: "$65/hr",
    growth: "15%"
  },
  { 
    id: "delivery", 
    name: "Delivery & Logistics", 
    count: 512,
    icon: "📦",
    colorClass: "category-other",
    description: "Boda boda, moving, errands",
    trending: true,
    avgPrice: "$20/hr",
    growth: "35%"
  }
];

const mockServices = [
  {
    id: "1",
    name: "Sarah Nakamya",
    service: "Professional House Cleaning & Organization",
    rating: 4.9,
    reviews: 147,
    location: "Kampala Central",
    price: 35,
    verified: true,
    available: true,
    responseTime: "~30 min",
    completedJobs: 298,
    specialties: ["Deep Cleaning", "Eco-Friendly", "Same Day Service"],
    badge: "Top Rated"
  },
  {
    id: "2",
    name: "John Mugisha",
    service: "Expert Plumbing & Electrical Services",
    rating: 4.8,
    reviews: 203,
    location: "Ntinda",
    price: 45,
    verified: true,
    available: true,
    responseTime: "~45 min",
    completedJobs: 456,
    specialties: ["Emergency Repair", "Installation", "24/7 Service"]
  },
  {
    id: "3",
    name: "Grace Atukunda",
    service: "Mathematics & Science Tutoring",
    rating: 5.0,
    reviews: 89,
    location: "Makerere University Area",
    price: 25,
    verified: true,
    available: false,
    responseTime: "~1 hour",
    completedJobs: 124,
    specialties: ["STEM Subjects", "University Prep", "Online Classes"]
  },
  {
    id: "4",
    name: "David Ssemwanga",
    service: "Complete Auto Repair & Detailing",
    rating: 4.7,
    reviews: 156,
    location: "Industrial Area",
    price: 65,
    verified: true,
    available: true,
    responseTime: "~2 hours",
    completedJobs: 289,
    specialties: ["Engine Repair", "Body Work", "Car Detailing"],
    badge: "Expert"
  },
  {
    id: "5",
    name: "Rose Nalwoga",
    service: "Professional Hair & Beauty Services",
    rating: 4.9,
    reviews: 134,
    location: "Kololo",
    price: 55,
    verified: true,
    available: true,
    responseTime: "~1 hour",
    completedJobs: 245,
    specialties: ["Hair Styling", "Makeup", "Bridal Services"]
  },
  {
    id: "6",
    name: "James Kiprotich",
    service: "Fast Boda Boda & Delivery Services",
    rating: 4.6,
    reviews: 298,
    location: "Multiple Areas",
    price: 15,
    verified: true,
    available: true,
    responseTime: "~10 min",
    completedJobs: 1247,
    specialties: ["Same Day Delivery", "City Wide", "Package Handling"],
    badge: "Fast Response"
  },
  {
    id: "7",
    name: "Agnes Namusoke",
    service: "English & Communication Skills Tutor",
    rating: 4.8,
    reviews: 76,
    location: "Nakasero",
    price: 30,
    verified: true,
    available: true,
    responseTime: "~2 hours",
    completedJobs: 89,
    specialties: ["Business English", "IELTS Prep", "Communication"]
  },
  {
    id: "8",
    name: "Peter Wanyama",
    service: "Garden Landscaping & Maintenance",
    rating: 4.7,
    reviews: 112,
    location: "Bugolobi",
    price: 40,
    verified: true,
    available: false,
    responseTime: "~4 hours",
    completedJobs: 167,
    specialties: ["Landscape Design", "Plant Care", "Irrigation"]
  }
];

// Enhanced Search & Filter Component
const SearchAndFilter = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedLocation, 
  setSelectedLocation,
  showFilters,
  setShowFilters,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  sortBy,
  setSortBy
}: any) => {
  const locations = [
    "All Locations",
    "Kampala Central",
    "Ntinda", 
    "Kololo",
    "Nakasero",
    "Makerere",
    "Industrial Area",
    "Bugolobi"
  ];

  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" }
  ];

  return (
    <div className="space-y-6">
      {/* Main Search Bar */}
      <div className="search-enhanced p-2">
        <div className="flex items-center">
          {/* Location Selector */}
          <div className="relative border-r border-gray-200">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-6 py-4 bg-transparent border-none outline-none font-medium text-gray-700 cursor-pointer"
            >
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for services, providers, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-lg font-medium"
          />

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-4 border-l border-gray-200 hover:text-primary transition-colors ${showFilters ? 'text-primary bg-primary/5' : 'text-gray-600'}`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {/* Search Button */}
          <button
            type="submit"
            className="btn-primary px-8 py-4 text-lg font-bold rounded-xl flex items-center gap-3 shadow-glow"
          >
            <Search className="w-5 h-5" />
            <span className="hidden sm:block">Search</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="card-glass p-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Price Range (per hour)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span className="font-bold text-primary">${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Minimum Rating
                </label>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={selectedRating === rating}
                        onChange={(e) => setSelectedRating(parseFloat(e.target.value))}
                        className="text-primary"
                      />
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{rating}+ stars</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Filters */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quick Filters
                </label>
                <div className="space-y-2">
                  {["Available Now", "Verified Only", "Same Day", "Top Rated"].map((filter) => (
                    <label key={filter} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="text-primary rounded" />
                      <span className="text-sm">{filter}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLocation("All Locations");
                  setPriceRange([0, 100]);
                  setSelectedRating(0);
                  setSortBy("recommended");
                }}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Services Page Component
export default function ServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State Management
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [isLoading, setIsLoading] = useState(false);

  // Filter services based on current filters
  useEffect(() => {
    setIsLoading(true);
    
    let filtered = mockServices.filter((service) => {
      // Search query filter
      if (searchQuery && !service.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !service.service.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Location filter
      if (selectedLocation !== "All Locations" && service.location !== selectedLocation) {
        return false;
      }
      
      // Price filter
      if (service.price > priceRange[1]) {
        return false;
      }
      
      // Rating filter
      if (selectedRating > 0 && service.rating < selectedRating) {
        return false;
      }
      
      return true;
    });

    // Sort services
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // Mock newest sort
        filtered.reverse();
        break;
      default:
        // Recommended - keep original order with some logic
        filtered.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
    }

    setTimeout(() => {
      setFilteredServices(filtered);
      setIsLoading(false);
    }, 300);
  }, [searchQuery, selectedLocation, priceRange, selectedRating, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Find Your Perfect <span className="text-gradient">Service Provider</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse thousands of verified professionals ready to help with your needs
            </p>
          </motion.div>

          {/* Trust Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <TrustBadge type="users" value="10K+" label="Active Users" />
            <TrustBadge type="verified" value="2.5K+" label="Verified Providers" />
            <TrustBadge type="rating" value="4.9" label="Average Rating" />
          </div>

          {/* Search and Filters */}
          <SearchAndFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          {/* Categories Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
              <Link href="/categories">
                <Button variant="outline" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCategories.slice(0, 6).map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  variant="compact"
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isLoading ? "Searching..." : `${filteredServices.length} Services Found`}
                </h2>
                {searchQuery && (
                  <p className="text-gray-600 mt-1">
                    Results for "<span className="font-semibold">{searchQuery}</span>"
                  </p>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-gray-600"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list" ? "bg-white text-primary shadow-sm" : "text-gray-600"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Results Grid/List */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="card-modern p-6 animate-pulse">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded" />
                          <div className="h-3 bg-gray-200 rounded w-3/4" />
                          <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : filteredServices.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ServiceCard
                        provider={service}
                        variant={viewMode === "list" ? "compact" : "default"}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="max-w-md mx-auto">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search criteria or browse our categories
                    </p>
                    <CTAButton
                      variant="primary"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedLocation("All Locations");
                        setPriceRange([0, 100]);
                        setSelectedRating(0);
                      }}
                    >
                      Clear Filters
                    </CTAButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Post your service request and let providers come to you with custom quotes
            </p>
            <CTAButton
              variant="secondary"
              size="lg"
              glow
              icon={<Sparkles className="w-5 h-5" />}
              href="/request-service"
            >
              Post Service Request
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}