'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryCard } from '@/components/shared/CategoryCard';

// Mock data for demonstration
const mockCategories = [
  { 
    id: '1', 
    name: 'Cleaning', 
    description: 'Professional cleaning services for homes and offices',
    serviceCount: 24,
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: '2', 
    name: 'Plumbing', 
    description: 'Expert plumbing services for all your needs',
    serviceCount: 18,
    iconName: 'Droplet',
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: '3', 
    name: 'Electrical', 
    description: 'Reliable electrical services for residential and commercial properties',
    serviceCount: 15,
    iconName: 'Zap',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: '4', 
    name: 'Gardening', 
    description: 'Professional gardening and landscaping services',
    serviceCount: 20,
    iconName: 'Flower',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: '5', 
    name: 'Tutoring', 
    description: 'Expert tutoring services for all subjects and levels',
    serviceCount: 32,
    iconName: 'BookOpen',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: '6', 
    name: 'Delivery', 
    description: 'Fast and reliable delivery services',
    serviceCount: 12,
    iconName: 'Package',
    imageUrl: 'https://images.unsplash.com/photo-1586880244406-8b640d5bdd0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: '7', 
    name: 'Beauty & Wellness', 
    description: 'Professional beauty and wellness services',
    serviceCount: 28,
    iconName: 'Scissors',
    imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: '8', 
    name: 'Home Repair', 
    description: 'Comprehensive home repair and maintenance services',
    serviceCount: 22,
    iconName: 'Hammer',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: '9', 
    name: 'Pet Care', 
    description: 'Loving and professional pet care services',
    serviceCount: 16,
    iconName: 'Paw',
    imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: '10', 
    name: 'Transportation', 
    description: 'Reliable transportation services',
    serviceCount: 14,
    iconName: 'Car',
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: '11', 
    name: 'Event Planning', 
    description: 'Professional event planning and management services',
    serviceCount: 19,
    iconName: 'Calendar',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: '12', 
    name: 'Photography', 
    description: 'Professional photography services for all occasions',
    serviceCount: 21,
    iconName: 'Camera',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // In a real app, you would fetch categories from your API
    // For demo purposes, we'll use the mock data and add a delay
    const timer = setTimeout(() => {
      setCategories(mockCategories);
      setFilteredCategories(mockCategories);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter categories based on search query
  useEffect(() => {
    if (categories.length === 0) return;

    if (searchQuery.trim() === '') {
      setFilteredCategories(categories);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = categories.filter(category => 
      category.name.toLowerCase().includes(query) || 
      category.description.toLowerCase().includes(query)
    );

    setFilteredCategories(filtered);
  }, [searchQuery, categories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect above
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Service Categories</h1>
        <p className="text-gray-600">Browse all service categories available on our platform</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCategories.map(category => (
            <Link href={`/services?category=${category.id}`} key={category.id}>
              <Card className="h-full hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <CategoryCard category={category} />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">No categories found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search criteria</p>
          <Button 
            variant="outline" 
            onClick={() => setSearchQuery('')} 
            className="mt-4"
          >
            Clear search
          </Button>
        </div>
      )}

      {/* Popular Services Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Popular Service Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.slice(0, 3).map(category => (
            <Card key={`popular-${category.id}`} className="overflow-hidden">
              <div className="relative h-48">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${category.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm">{category.serviceCount} services available</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-600 text-sm">{category.description}</p>
                <Button 
                  variant="link" 
                  className="mt-2 p-0 h-auto" 
                  asChild
                >
                  <Link href={`/services?category=${category.id}`}>
                    Browse {category.name} Services
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Browse Categories</h3>
            <p className="text-gray-600">Explore our wide range of service categories to find what you need.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Choose a Service</h3>
            <p className="text-gray-600">Select from our verified service providers based on ratings and reviews.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Book & Enjoy</h3>
            <p className="text-gray-600">Schedule your service, make secure payments, and enjoy quality service.</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Button asChild>
            <Link href="/services">Find a Service Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}