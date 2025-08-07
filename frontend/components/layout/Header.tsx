"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search,
  MapPin,
  Bell,
  User,
  Menu,
  X,
  ChevronDown,
  Star,
  Shield,
  Briefcase,
  Heart,
  Settings,
  LogOut,
  TrendingUp,
  Users,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  Filter,
  Mic,
  Camera
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

// Types
interface Location {
  id: string;
  name: string;
  country: string;
  popular: boolean;
  serviceCount: number;
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  trending: boolean;
}

interface UserData {
  name: string;
  email: string;
  avatar?: string;
  rating: number;
  isVerified: boolean;
  type: 'client' | 'provider';
  location: string;
}

// Enhanced Search Component with AI-powered suggestions
const IntelligentSearchBar: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    id: "kampala",
    name: "Kampala",
    country: "Uganda",
    popular: true,
    serviceCount: 1247
  });
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches] = useState(["House Cleaning", "Car Repair", "Tutoring"]);
  const [trendingServices] = useState(["Boda Boda", "Plumbing", "Electrician", "Beauty Services"]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const locations: Location[] = [
    { id: "kampala", name: "Kampala", country: "Uganda", popular: true, serviceCount: 1247 },
    { id: "entebbe", name: "Entebbe", country: "Uganda", popular: false, serviceCount: 156 },
    { id: "jinja", name: "Jinja", country: "Uganda", popular: false, serviceCount: 89 },
    { id: "capetown", name: "Cape Town", country: "South Africa", popular: true, serviceCount: 2156 },
    { id: "johannesburg", name: "Johannesburg", country: "South Africa", popular: true, serviceCount: 1893 }
  ];

  const serviceCategories: ServiceCategory[] = [
    { id: "home", name: "Home Services", icon: "🏠", count: 456, trending: true },
    { id: "auto", name: "Automotive", icon: "🚗", count: 234, trending: true },
    { id: "beauty", name: "Beauty & Wellness", icon: "💅", count: 189, trending: false },
    { id: "education", name: "Education", icon: "📚", count: 167, trending: false },
    { id: "delivery", name: "Delivery", icon: "📦", count: 298, trending: true }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/services?q=${encodeURIComponent(query)}&location=${selectedLocation.id}`;
    }
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          {/* Main Search Container */}
          <div className="flex items-center bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            
            {/* Location Selector */}
            <div className="relative border-r border-gray-200/80">
          <button
            type="button"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-3 px-5 py-4 text-sm font-semibold text-gray-700 hover:text-primary transition-all duration-200 group"
              >
                <div className="relative">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-xs text-gray-500 font-medium">Location</span>
                  <span className="text-gray-900 font-bold">{selectedLocation.name}</span>
                </div>
                <span className="md:hidden text-gray-900 font-bold truncate max-w-20">
                  {selectedLocation.name}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showLocationDropdown ? 'rotate-180' : ''}`} />
          </button>
          
              {/* Location Dropdown */}
          <AnimatePresence>
                {showLocationDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-3 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-orange-500 rounded-xl flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Choose Your Location</h3>
                          <p className="text-xs text-gray-600">Find services in your area</p>
                        </div>
                  </div>
                      
                      <div className="space-y-2">
                  {locations.map((location) => (
                    <motion.button
                            key={location.id}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(location);
                              setShowLocationDropdown(false);
                            }}
                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group text-left"
                            whileHover={{ x: 4 }}
                          >
                            <div className="flex items-center gap-3">
                              <MapPin className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-gray-900">{location.name}</span>
                                  {location.popular && (
                                    <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">
                                      Popular
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-gray-500">{location.country} • {location.serviceCount} services</span>
                              </div>
                            </div>
                            {selectedLocation.id === location.id && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </motion.button>
                  ))}
                      </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

            {/* Search Input */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
                placeholder="What service are you looking for?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
                className="w-full px-6 py-4 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-base font-medium"
                autoComplete="off"
              />
              
              {/* Search Suggestions Overlay */}
      <AnimatePresence>
                {showSuggestions && (
          <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 z-40 overflow-hidden"
          >
            <div className="p-6">
                      {/* Recent Searches */}
                      {recentSearches.length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-600">Recent Searches</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.map((search, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setQuery(search);
                                  setShowSuggestions(false);
                                }}
                                className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm transition-colors"
                              >
                                {search}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Trending Services */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold text-gray-600">Trending in {selectedLocation.name}</span>
                        </div>
                        <div className="space-y-1">
                          {trendingServices.map((service, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setQuery(service);
                                setShowSuggestions(false);
                              }}
                              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group text-left"
                            >
                              <Search className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                              <span className="text-gray-700 group-hover:text-gray-900">{service}</span>
                              <ArrowRight className="w-3 h-3 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Service Categories */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Filter className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-600">Browse Categories</span>
                    </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {serviceCategories.slice(0, 4).map((category) => (
                          <Link
                              key={category.id}
                              href={`/services/category/${category.id}`}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                              onClick={() => setShowSuggestions(false)}
                            >
                              <span className="text-lg">{category.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                                  {category.trending && (
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                  )}
                                </div>
                                <span className="text-xs text-gray-500">{category.count} services</span>
                              </div>
                          </Link>
                ))}
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

            {/* Advanced Search Features */}
            <div className="flex items-center gap-2 px-4">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-gray-50"
                title="Voice Search"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-gray-50"
                title="Visual Search"
              >
                <Camera className="w-4 h-4" />
              </button>
                </div>

            {/* Search Button */}
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-400 text-white rounded-r-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:block">Search</span>
                  </button>
                </div>
              </div>
      </form>
    </div>
  );
};

// Enhanced Navigation Component
const NavigationMenu: React.FC = () => {
  const pathname = usePathname();
  
  const navItems = [
    { 
      name: "Browse Services", 
      href: "/services", 
      icon: TrendingUp,
      badge: "1.2k+ active",
      description: "Discover local providers"
    },
    { 
      name: "How It Works", 
      href: "/how-it-works", 
      icon: Sparkles,
      description: "Learn about our platform"
    },
    { 
      name: "For Providers", 
      href: "/providers", 
      icon: Briefcase,
      badge: "Earn money",
      description: "Join our network"
    }
  ];

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <div key={item.name} className="relative group">
            <Link
              href={item.href}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isActive 
                  ? 'text-primary bg-primary/10 shadow-md' 
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
              {item.badge && (
                <span className="px-2 py-0.5 bg-gradient-to-r from-primary to-orange-500 text-white text-xs font-bold rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
            
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {item.description}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

// Enhanced User Menu Component
const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState(3);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Use the auth implementation
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  
  useEffect(() => {
    // Check authentication status from our auth library
    const checkAuth = async () => {
      try {
        // Import dynamically to avoid SSR issues
        const authModule = await import('@/lib/auth');
        
        // Check if user is authenticated by checking localStorage directly
        const authStatus = typeof window !== 'undefined' && localStorage.getItem('user') !== null;
        setIsAuthenticated(authStatus);
        
        if (authStatus) {
          // Only call getUser() if we know the user is authenticated
          const user = authModule.getUser();
          if (user) {
            setUserData({
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              rating: 4.9, // Mock rating for now
              isVerified: true, // Mock verification for now
              type: user.role.toLowerCase() === 'provider' ? 'provider' : 'client',
              location: 'Kampala, Uganda' // Mock location for now
            });
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
    
    checkAuth();
    
    // Listen for storage events (for when user logs in/out in another tab)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'user') {
        // Check authentication status directly without calling checkAuth
        const authStatus = typeof window !== 'undefined' && localStorage.getItem('user') !== null;
        setIsAuthenticated(authStatus);
        
        if (authStatus && typeof window !== 'undefined') {
          try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              const user = JSON.parse(storedUser);
              setUserData({
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                rating: 4.9, // Mock rating for now
                isVerified: true, // Mock verification for now
                type: user.role.toLowerCase() === 'provider' ? 'provider' : 'client',
                location: 'Kampala, Uganda' // Mock location for now
              });
            }
          } catch (e) {
            console.error('Error parsing user data:', e);
          }
        }
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
    return undefined;
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="hidden lg:flex items-center space-x-3">
        <Link href="/auth/login">
          <button className="px-4 py-2 text-gray-700 hover:text-primary font-semibold transition-colors">
            Sign In
          </button>
        </Link>
        <Link href="/auth/register">
          <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Get Started
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
      >
        {/* Notifications */}
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {notifications > 9 ? '9+' : notifications}
          </span>
        )}
        </div>

        {/* User Avatar */}
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-orange-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
            {userData?.name.charAt(0)}
          </div>
          {userData?.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
              <Shield className="w-2 h-2 text-white" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="hidden md:block text-left">
          <div className="text-sm font-bold text-gray-900">{userData?.name}</div>
          <div className="text-xs text-gray-500 capitalize flex items-center gap-1">
            <span>{userData?.type}</span>
            {userData?.type === 'provider' && (
              <>
                <span>•</span>
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span>{userData?.rating}</span>
              </>
            )}
          </div>
        </div>

        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* User Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden"
          >
            {/* User Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-orange-500 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-lg">
                    {userData?.name.charAt(0)}
                  </div>
                  {userData?.isVerified && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-3 border-white">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                )}
              </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{userData?.name}</h3>
                  <p className="text-gray-600 text-sm">{userData?.email}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-700">{userData?.rating}</span>
            </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{userData?.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="p-4">
              {[
                { icon: User, label: 'Profile', href: '/profile' },
                { icon: Heart, label: 'Favorites', href: '/favorites' },
                { icon: Award, label: 'My Bookings', href: '/bookings' },
                { icon: Settings, label: 'Settings', href: '/settings' }
              ].map((item, index) => (
              <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.label}</span>
              </Link>
              ))}
              
              <button 
                onClick={() => {
                  // Import dynamically to avoid SSR issues
                  import('@/lib/auth').then(({ signOut }) => {
                    signOut().then(() => {
                      setIsOpen(false);
                      setIsAuthenticated(false);
                      setUserData(null);
                      // Redirect to home page after sign out
                      window.location.href = '/';
                    }).catch(error => {
                      console.error('Error signing out:', error);
                    });
                  });
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors group mt-2"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Header Component
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-2xl shadow-xl border-b border-gray-200/50' 
          : 'bg-white/95 backdrop-blur-lg border-b border-gray-200/30'
      }`}
    >
      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-primary/5 via-orange-500/5 to-red-500/5 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-semibold text-gray-700">
                  <span className="text-primary">2,500+</span> verified providers
                </span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-gray-700">100% secure payments</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-700">4.9/5 average rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
        
          {/* Logo */}
            <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            >
              <Logo />
            </motion.div>

          {/* Desktop Search */}
          <motion.div 
            className="hidden lg:block flex-1 max-w-2xl mx-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <IntelligentSearchBar />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NavigationMenu />
            
            {/* Provider CTA */}
            <Link href="/providers/signup">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Briefcase className="w-4 h-4" />
                <span>Earn with Neza</span>
              </button>
              </Link>

            <UserMenu />
              </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
              </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <IntelligentSearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              <nav className="space-y-4">
                {[
                  { name: "Browse Services", href: "/services", icon: TrendingUp },
                  { name: "How It Works", href: "/how-it-works", icon: Sparkles },
                  { name: "For Providers", href: "/providers", icon: Briefcase },
                  { name: "Help & Support", href: "/help", icon: Shield }
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-orange-500/20 transition-colors">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-bold text-gray-900 text-lg">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6 border-t border-gray-200"
                >
                  <Link
                    href="/providers/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-3 w-full p-4 bg-gradient-to-r from-primary to-orange-500 text-white font-bold rounded-2xl shadow-lg"
                  >
                    <Briefcase className="w-6 h-6" />
                    <span>Start Earning Today</span>
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;