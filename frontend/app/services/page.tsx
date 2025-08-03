'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, X, Grid, List, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ServiceCard } from '@/components/services/ServiceCard';
import { CategoryCard } from '@/components/services/CategoryCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for demonstration
const mockCategories = [
  { id: '1', name: 'Cleaning', imageUrl: '/placeholder.svg' },
  { id: '2', name: 'Plumbing', imageUrl: '/placeholder.svg' },
  { id: '3', name: 'Electrical', imageUrl: '/placeholder.svg' },
  { id: '4', name: 'Gardening', imageUrl: '/placeholder.svg' },
  { id: '5', name: 'Tutoring', imageUrl: '/placeholder.svg' },
  { id: '6', name: 'Delivery', imageUrl: '/placeholder.svg' },
  { id: '7', name: 'Beauty & Wellness', imageUrl: '/placeholder.svg' },
  { id: '8', name: 'Home Repair', imageUrl: '/placeholder.svg' },
];

const mockServices = [
  {
    id: '1',
    title: 'Professional House Cleaning Service',
    description: 'Comprehensive house cleaning service including dusting, vacuuming, mopping, bathroom cleaning, kitchen cleaning, and more.',
    price: 75.00,
    duration: 120, // 2 hours
    category: 'Cleaning',
    categoryId: '1',
    rating: 4.8,
    reviewCount: 124,
    location: 'New York, NY',
    isRemote: false,
    imageUrl: '/placeholder.svg',
    provider: {
      id: '101',
      name: 'Clean Pro Services',
      rating: 4.9,
    },
  },
  {
    id: '2',
    title: 'Emergency Plumbing Repair',
    description: 'Fast and reliable emergency plumbing services. Available 24/7 for leaks, clogs, and other plumbing emergencies.',
    price: 95.00,
    duration: 60, // 1 hour
    category: 'Plumbing',
    categoryId: '2',
    rating: 4.7,
    reviewCount: 89,
    location: 'Chicago, IL',
    isRemote: false,
    imageUrl: '/placeholder.svg',
    provider: {
      id: '102',
      name: 'Quick Fix Plumbing',
      rating: 4.8,
    },
  },
  {
    id: '3',
    title: 'Electrical Installation and Repair',
    description: 'Professional electrical services for residential and commercial properties. Installation, repair, and maintenance.',
    price: 85.00,
    duration: 90, // 1.5 hours
    category: 'Electrical',
    categoryId: '3',
    rating: 4.9,
    reviewCount: 112,
    location: 'Los Angeles, CA',
    isRemote: false,
    imageUrl: '/placeholder.svg',
    provider: {
      id: '103',
      name: 'PowerTech Electric',
      rating: 4.9,
    },
  },
  {
    id: '4',
    title: 'Lawn Mowing and Garden Maintenance',
    description: 'Regular lawn mowing and garden maintenance services. Keep your outdoor space looking beautiful all year round.',
    price: 60.00,
    duration: 120, // 2 hours
    category: 'Gardening',
    categoryId: '4',
    rating: 4.6,
    reviewCount: 78,
    location: 'Austin, TX',
    isRemote: false,
    imageUrl: '/placeholder.svg',
    provider: {
      id: '104',
      name: 'Green Thumb Gardens',
      rating: 4.7,
    },
  },
  {
    id: '5',
    title: 'Math Tutoring for All Levels',
    description: 'Expert math tutoring for students of all ages and levels. Personalized lessons to help improve grades and understanding.',
    price: 45.00,
    duration: 60, // 1 hour
    category: 'Tutoring',
    categoryId: '5',
    rating: 4.9,
    reviewCount: 156,
    isRemote: true,
    imageUrl: '/placeholder.svg',
    provider: {
      id: '105',
      name: 'Academic Excellence',
      rating: 4.9,
    },
  },
  {
    id: '6',
    title: 'Same-Day Package Delivery',
    description: 'Fast and reliable same-day package delivery service for local businesses and individuals.',
    price: 25.00,
    duration: 30, // 30 minutes
    category: 'Delivery',
    categoryId: '6',
    rating: 4.7,
    reviewCount: 92,
    location: 'Seattle, WA',
    isRemote: false,
    imageUrl: '/placeholder.svg',
    provider: {
      id: '106',
      name: 'Swift Delivery Co.',
      rating: 4.8,
    },
  },
  {
    id: '7',
    title: 'Professional Massage Therapy',
    description: 'Relaxing and therapeutic massage services. Swedish, deep tissue, sports, and hot stone massages available.',
    price: 80.00,
    duration: 60, // 1 hour
    category: 'Beauty & Wellness',
    categoryId: '7',
    rating: 4.8,
    reviewCount: 134,
    location: 'Miami, FL',
    isRemote: false,
    imageUrl: '/placeholder.svg',
    provider: {
      id: '107',
      name: 'Wellness Therapy',
      rating: 4.9,
    },
  },
  {
    id: '8',
    title: 'Furniture Assembly Service',
    description: 'Professional furniture assembly service for all types of furniture. Fast, efficient, and hassle-free.',
    price: 65.00,
    duration: 90, // 1.5 hours
    category: 'Home Repair',
    categoryId: '8',
    rating: 4.7,
    reviewCount: 103,
    location: 'Denver, CO',
    isRemote: false,
    imageUrl: '/placeholder.svg',
    provider: {
      id: '108',
      name: 'Assembly Experts',
      rating: 4.8,
    },
  },
];

export default function ServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  useEffect(() => {
    // In a real app, you would fetch services from your API
    // For demo purposes, we'll use the mock data and add a delay
    const timer = setTimeout(() => {
      setServices(mockServices);
      setFilteredServices(mockServices);
      setIsLoading(false);
      
      // Apply any filters from URL params
      const categoryParam = searchParams.get('category');
      const searchParam = searchParams.get('search');
      
      if (categoryParam) {
        setSelectedCategory(categoryParam);
        filterServices(searchParam || '', categoryParam, priceRange);
      } else if (searchParam) {
        setSearchQuery(searchParam);
        filterServices(searchParam, '', priceRange);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [searchParams]);
  
  useEffect(() => {
    filterServices(searchQuery, selectedCategory, priceRange);
  }, [searchQuery, selectedCategory, priceRange]);
  
  const filterServices = (query: string, category: string, price: [number, number]) => {
    let filtered = [...services];
    
    if (query) {
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(service => service.categoryId === category);
    }
    
    filtered = filtered.filter(service => 
      service.price >= price[0] && service.price <= price[1]
    );
    
    setFilteredServices(filtered);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    
    const newUrl = `/services${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 200]);
    router.push('/services');
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Services</h1>
          <p className="text-gray-600">Find the perfect service for your needs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/services/search">
              <Search className="h-4 w-4 mr-2" />
              Advanced Search
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/services/categories">
              <Filter className="h-4 w-4 mr-2" />
              Browse Categories
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Featured Categories */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Categories</h2>
          <Button variant="ghost" asChild>
            <Link href="/services/categories" className="flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockCategories.slice(0, 4).map(category => (
            <CategoryCard 
              key={category.id} 
              category={{
                id: category.id,
                name: category.name,
                description: `Find the best ${category.name.toLowerCase()} services`,
                imageUrl: '/placeholder.svg',
                serviceCount: Math.floor(Math.random() * 100) + 20,
                popularServices: []
              }}
              variant="grid"
            />
          ))}
        </div>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-gray-100' : ''}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-gray-100' : ''}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="all-categories"
                        name="category"
                        checked={selectedCategory === ''}
                        onChange={() => setSelectedCategory('')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="all-categories" className="ml-2 text-gray-700">
                        All Categories
                      </label>
                    </div>
                    
                    {mockCategories.map(category => (
                      <div key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${category.id}`}
                          name="category"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-700">
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
                
                {(searchQuery || selectedCategory || priceRange[0] > 0 || priceRange[1] < 200) && (
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Filter Bar */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <form onSubmit={handleSearch} className="flex-1 flex">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button type="submit" className="ml-2">
                    Search
                  </Button>
                </form>
                
                <Button 
                  variant="outline" 
                  className="lg:hidden flex items-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mb-6 p-4 border rounded-lg bg-gray-50">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Categories</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="mobile-all-categories"
                            name="mobile-category"
                            checked={selectedCategory === ''}
                            onChange={() => setSelectedCategory('')}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor="mobile-all-categories" className="ml-2 text-gray-700">
                            All Categories
                          </label>
                        </div>
                        
                        {mockCategories.map(category => (
                          <div key={`mobile-${category.id}`} className="flex items-center">
                            <input
                              type="radio"
                              id={`mobile-category-${category.id}`}
                              name="mobile-category"
                              checked={selectedCategory === category.id}
                              onChange={() => setSelectedCategory(category.id)}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor={`mobile-category-${category.id}`} className="ml-2 text-gray-700">
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Price Range</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={clearFilters} className="w-1/2 mr-2">
                        <X className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                      <Button onClick={() => setShowFilters(false)} className="w-1/2 ml-2">
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Results Info */}
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600">
                  {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Sort by:</span>
                    <select 
                      className="text-sm border-gray-300 rounded-md"
                      defaultValue="relevance"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="rating">Highest Rating</option>
                    </select>
                  </div>
                  <div className="flex items-center border rounded-md">
                    <button 
                      className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button 
                      className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Services Display */}
              {filteredServices.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredServices.map(service => (
                      <ServiceCard 
                        key={service.id} 
                        service={service} 
                        variant="grid"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {filteredServices.map(service => (
                      <ServiceCard 
                        key={service.id} 
                        service={service} 
                        variant="list"
                      />
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">No services found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="featured" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockServices.slice(0, 3).map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                variant="grid"
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="popular" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockServices
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
              .map(service => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  variant="grid"
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockServices.slice(4, 7).map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                variant="grid"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}