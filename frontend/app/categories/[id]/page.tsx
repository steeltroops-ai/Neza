'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Search, Filter, Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { formatCurrency } from '@/lib/utils';

// Mock category data
const mockCategories = [
  { id: '1', name: 'Home Cleaning', icon: '🧹', serviceCount: 24 },
  { id: '2', name: 'Plumbing', icon: '🔧', serviceCount: 18 },
  { id: '3', name: 'Electrical', icon: '⚡', serviceCount: 15 },
  { id: '4', name: 'Gardening', icon: '🌱', serviceCount: 20 },
  { id: '5', name: 'Tutoring', icon: '📚', serviceCount: 30 },
];

// Mock services data
const mockServices = [
  {
    id: '101',
    title: 'Professional House Cleaning',
    description: 'Comprehensive house cleaning service including dusting, vacuuming, mopping, bathroom and kitchen cleaning.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    providerId: '201',
    providerName: 'CleanPro Services',
    providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    price: 75,
    currency: 'USD',
    unit: 'hour',
    rating: 4.8,
    reviewCount: 124,
    categoryId: '1',
    location: 'Anytown, USA',
    tags: ['Deep Cleaning', 'Eco-Friendly', 'Same Day'],
  },
  {
    id: '102',
    title: 'Window Cleaning Service',
    description: 'Professional window cleaning for homes and offices. Interior and exterior cleaning available.',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    providerId: '202',
    providerName: 'Crystal Clear Windows',
    providerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    price: 60,
    currency: 'USD',
    unit: 'hour',
    rating: 4.6,
    reviewCount: 89,
    categoryId: '1',
    location: 'Anytown, USA',
    tags: ['Residential', 'Commercial', 'High-Rise'],
  },
  {
    id: '103',
    title: 'Carpet Cleaning',
    description: 'Deep carpet cleaning using hot water extraction method to remove stains, dirt, and allergens.',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    providerId: '203',
    providerName: 'Fresh Carpets Co.',
    providerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    price: 120,
    currency: 'USD',
    unit: 'room',
    rating: 4.9,
    reviewCount: 156,
    categoryId: '1',
    location: 'Anytown, USA',
    tags: ['Stain Removal', 'Pet Friendly', 'Odor Removal'],
  },
  {
    id: '104',
    title: 'Move-in/Move-out Cleaning',
    description: 'Thorough cleaning service for when you\'re moving in or out of a property. Includes deep cleaning of all areas.',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    providerId: '204',
    providerName: 'Moving Maids',
    providerImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    price: 250,
    currency: 'USD',
    unit: 'service',
    rating: 4.7,
    reviewCount: 112,
    categoryId: '1',
    location: 'Anytown, USA',
    tags: ['Move-in', 'Move-out', 'Deep Cleaning'],
  },
];

export default function CategoryDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [category, setCategory] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch category and services data from your API
    // For demo purposes, we'll use the mock data and add a delay
    const timer = setTimeout(() => {
      const foundCategory = mockCategories.find(cat => cat.id === params.id);
      const categoryServices = mockServices.filter(service => service.categoryId === params.id);
      
      setCategory(foundCategory || { id: params.id, name: 'Unknown Category', icon: '❓', serviceCount: 0 });
      setServices(categoryServices);
      setFilteredServices(categoryServices);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [params.id]);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...services];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(service => 
        service.title.toLowerCase().includes(query) || 
        service.description.toLowerCase().includes(query) ||
        service.providerName.toLowerCase().includes(query) ||
        service.tags.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply price range filter
    result = result.filter(service => 
      service.price >= priceRange[0] && service.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'recommended':
      default:
        // For recommended, we'll use a combination of rating and review count
        result.sort((a, b) => (b.rating * Math.log(b.reviewCount + 1)) - (a.rating * Math.log(a.reviewCount + 1)));
        break;
    }
    
    setFilteredServices(result);
  }, [services, searchQuery, priceRange, sortOption]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading category details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => router.push('/categories')}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Categories
      </Button>

      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <span className="text-4xl mr-3">{category.icon}</span>
          <h1 className="text-3xl font-bold">{category.name}</h1>
        </div>
        <p className="text-gray-600">{category.serviceCount} services available</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={`Search in ${category.name}...`}
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Button 
            variant="outline" 
            className="md:w-auto" 
            onClick={toggleFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <div className="relative">
            <select
              className="w-full h-10 pl-3 pr-10 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="number"
                      placeholder="Min"
                      className="w-24"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange[1])}
                    />
                    <span>to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      className="w-24"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(priceRange[0], Number(e.target.value))}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Deep Cleaning', 'Same Day', 'Eco-Friendly', 'Residential', 'Commercial'].map((tag) => (
                      <Button 
                        key={tag} 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                        onClick={() => setSearchQuery(tag)}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Services List */}
      <div className="mb-12">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No services found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setPriceRange([0, 1000]);
                setSortOption('recommended');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>

      {/* Related Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Related Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockCategories
            .filter(cat => cat.id !== category.id)
            .slice(0, 4)
            .map(cat => (
              <Link href={`/categories/${cat.id}`} key={cat.id}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2">{cat.icon}</div>
                    <h3 className="font-medium">{cat.name}</h3>
                    <p className="text-sm text-gray-500">{cat.serviceCount} services</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary/10 rounded-lg p-6 md:p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Are you a service provider?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join our platform and offer your services to thousands of potential clients in your area.
        </p>
        <Button size="lg">
          Become a Provider
        </Button>
      </div>
    </div>
  );
}