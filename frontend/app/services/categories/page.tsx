'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Grid3X3, List, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // In a real app, you would fetch categories from your API
    // For demo purposes, we'll use mock data and add a delay
    const timer = setTimeout(() => {
      // Mock categories data
      const mockCategories = [
        {
          id: '1',
          name: 'Cleaning',
          description: 'Professional cleaning services for homes and offices',
          iconUrl: '/icons/cleaning.svg',
          imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          serviceCount: 24,
          popularServices: [
            'House Cleaning',
            'Deep Cleaning',
            'Office Cleaning',
            'Move-in/Move-out Cleaning'
          ]
        },
        {
          id: '2',
          name: 'Plumbing',
          description: 'Expert plumbing services for all your needs',
          iconUrl: '/icons/plumbing.svg',
          imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          serviceCount: 18,
          popularServices: [
            'Leak Repair',
            'Pipe Installation',
            'Drain Cleaning',
            'Water Heater Installation'
          ]
        },
        {
          id: '3',
          name: 'Electrical',
          description: 'Licensed electricians for all electrical work',
          iconUrl: '/icons/electrical.svg',
          imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          serviceCount: 15,
          popularServices: [
            'Wiring Installation',
            'Electrical Repairs',
            'Lighting Installation',
            'Electrical Inspections'
          ]
        },
        {
          id: '4',
          name: 'Gardening',
          description: 'Professional gardening and landscaping services',
          iconUrl: '/icons/gardening.svg',
          imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          serviceCount: 20,
          popularServices: [
            'Lawn Mowing',
            'Garden Maintenance',
            'Landscaping',
            'Tree Trimming'
          ]
        },
        {
          id: '5',
          name: 'Tutoring',
          description: 'Expert tutors for all subjects and levels',
          iconUrl: '/icons/tutoring.svg',
          imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          serviceCount: 32,
          popularServices: [
            'Math Tutoring',
            'Language Tutoring',
            'Science Tutoring',
            'Test Preparation'
          ]
        },
        {
          id: '6',
          name: 'Pet Care',
          description: 'Loving care for your pets when you need it',
          iconUrl: '/icons/pet-care.svg',
          imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          serviceCount: 16,
          popularServices: [
            'Dog Walking',
            'Pet Sitting',
            'Pet Grooming',
            'Pet Training'
          ]
        },
        {
          id: '7',
          name: 'Home Repairs',
          description: 'General home repair and maintenance services',
          iconUrl: '/icons/home-repairs.svg',
          imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          serviceCount: 28,
          popularServices: [
            'Handyman Services',
            'Furniture Assembly',
            'Door & Window Repairs',
            'Drywall Repair'
          ]
        },
        {
          id: '8',
          name: 'Moving',
          description: 'Professional moving services for homes and offices',
          iconUrl: '/icons/moving.svg',
          imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          serviceCount: 12,
          popularServices: [
            'Local Moving',
            'Long Distance Moving',
            'Packing Services',
            'Furniture Moving'
          ]
        },
        {
          id: '9',
          name: 'Beauty & Wellness',
          description: 'Professional beauty and wellness services',
          iconUrl: '/icons/beauty.svg',
          imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          serviceCount: 35,
          popularServices: [
            'Haircuts & Styling',
            'Massage Therapy',
            'Nail Services',
            'Makeup Services'
          ]
        },
        {
          id: '10',
          name: 'Technology',
          description: 'Tech support and IT services for home and business',
          iconUrl: '/icons/technology.svg',
          imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          serviceCount: 22,
          popularServices: [
            'Computer Repair',
            'IT Support',
            'Network Setup',
            'Smart Home Installation'
          ]
        },
        {
          id: '11',
          name: 'Event Planning',
          description: 'Professional event planning and coordination services',
          iconUrl: '/icons/event.svg',
          imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          serviceCount: 18,
          popularServices: [
            'Wedding Planning',
            'Birthday Parties',
            'Corporate Events',
            'Event Decoration'
          ]
        },
        {
          id: '12',
          name: 'Automotive',
          description: 'Professional automotive repair and maintenance services',
          iconUrl: '/icons/automotive.svg',
          imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          serviceCount: 14,
          popularServices: [
            'Oil Change',
            'Tire Replacement',
            'Brake Service',
            'Engine Repair'
          ]
        },
      ];
      
      setCategories(mockCategories);
      setFilteredCategories(mockCategories);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter categories based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = categories.filter(category => 
        category.name.toLowerCase().includes(lowerQuery) ||
        category.description.toLowerCase().includes(lowerQuery) ||
        category.popularServices.some((service: string) => 
          service.toLowerCase().includes(lowerQuery)
        )
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Service Categories</h1>
        <p className="text-gray-600 mb-6">Browse through our service categories to find the help you need.</p>
        
        <form onSubmit={handleSearch} className="flex gap-4 max-w-xl">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search categories..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No categories found</h3>
          <p className="text-gray-500 mb-6">Try searching for something else.</p>
          <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
        </div>
      ) : (
        <div>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <Link 
                  href={`/services/search?category=${category.id}`} 
                  key={category.id}
                  className="block group"
                >
                  <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md group-hover:border-primary">
                    <CardContent className="p-0">
                      <div className="relative h-40 bg-gray-100">
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Image Placeholder</span>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button variant="secondary" size="sm">
                            View Services
                          </Button>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {category.description}
                        </p>
                        <div className="text-sm text-gray-500">
                          {category.serviceCount} services available
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCategories.map((category) => (
                <Card key={category.id} className="overflow-hidden hover:shadow-md transition-all duration-200 hover:border-primary">
                  <CardContent className="p-0">
                    <Link href={`/services/search?category=${category.id}`} className="flex flex-col md:flex-row">
                      <div className="relative md:w-1/4 h-40 md:h-auto bg-gray-100">
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Image Placeholder</span>
                        </div>
                      </div>
                      <div className="p-6 md:w-3/4">
                        <h3 className="text-xl font-semibold mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {category.description}
                        </p>
                        <div className="text-sm text-gray-500 mb-4">
                          {category.serviceCount} services available
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Popular services:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                            {category.popularServices.map((service: string, index: number) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}