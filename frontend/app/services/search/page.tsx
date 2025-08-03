'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get search parameters from URL
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('relevance');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [isRemoteFilter, setIsRemoteFilter] = useState<boolean | null>(null);
  
  // Mobile filter visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Mock categories data
  const categories = [
    { id: '1', name: 'Cleaning' },
    { id: '2', name: 'Plumbing' },
    { id: '3', name: 'Electrical' },
    { id: '4', name: 'Gardening' },
    { id: '5', name: 'Tutoring' },
    { id: '6', name: 'Pet Care' },
  ];
  
  // Mock locations data
  const locations = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
  ];
  
  useEffect(() => {
    // In a real app, you would fetch services from your API based on search parameters
    // For demo purposes, we'll use mock data and add a delay
    const timer = setTimeout(() => {
      // Mock services data
      const mockServices = [
        {
          id: '1',
          title: 'Professional House Cleaning',
          description: 'Comprehensive house cleaning service including dusting, vacuuming, mopping, bathroom cleaning, kitchen cleaning, and more.',
          price: 75.00,
          duration: 120,
          category: 'Cleaning',
          categoryId: '1',
          rating: 4.8,
          reviewCount: 124,
          location: 'New York',
          isRemote: false,
          provider: {
            id: '101',
            name: 'Clean Pro Services',
            rating: 4.9,
          },
          imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
        {
          id: '2',
          title: 'Plumbing Repair Service',
          description: 'Professional plumbing repair service for leaks, clogs, installations, and more.',
          price: 95.00,
          duration: 60,
          category: 'Plumbing',
          categoryId: '2',
          rating: 4.6,
          reviewCount: 89,
          location: 'Los Angeles',
          isRemote: false,
          provider: {
            id: '102',
            name: 'Quick Fix Plumbing',
            rating: 4.7,
          },
          imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
        {
          id: '3',
          title: 'Electrical Wiring and Repair',
          description: 'Licensed electrician for all your electrical needs including wiring, installations, and repairs.',
          price: 110.00,
          duration: 90,
          category: 'Electrical',
          categoryId: '3',
          rating: 4.9,
          reviewCount: 76,
          location: 'Chicago',
          isRemote: false,
          provider: {
            id: '103',
            name: 'Power Pro Electrical',
            rating: 4.8,
          },
          imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
        {
          id: '4',
          title: 'Lawn Mowing and Garden Maintenance',
          description: 'Regular lawn mowing and garden maintenance service to keep your outdoor space looking great.',
          price: 50.00,
          duration: 60,
          category: 'Gardening',
          categoryId: '4',
          rating: 4.5,
          reviewCount: 112,
          location: 'Houston',
          isRemote: false,
          provider: {
            id: '104',
            name: 'Green Thumb Gardening',
            rating: 4.6,
          },
          imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
        {
          id: '5',
          title: 'Math Tutoring for All Levels',
          description: 'Experienced math tutor offering personalized lessons for students of all ages and levels.',
          price: 40.00,
          duration: 60,
          category: 'Tutoring',
          categoryId: '5',
          rating: 4.9,
          reviewCount: 65,
          location: 'Phoenix',
          isRemote: true,
          provider: {
            id: '105',
            name: 'Academic Excellence',
            rating: 4.9,
          },
          imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
        {
          id: '6',
          title: 'Dog Walking and Pet Sitting',
          description: 'Reliable dog walking and pet sitting services for when you're away or busy.',
          price: 25.00,
          duration: 30,
          category: 'Pet Care',
          categoryId: '6',
          rating: 4.7,
          reviewCount: 93,
          location: 'New York',
          isRemote: false,
          provider: {
            id: '106',
            name: 'Happy Paws Pet Services',
            rating: 4.8,
          },
          imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
        {
          id: '7',
          title: 'Deep Cleaning Service',
          description: 'Thorough deep cleaning service for homes that need extra attention to detail.',
          price: 120.00,
          duration: 240,
          category: 'Cleaning',
          categoryId: '1',
          rating: 4.9,
          reviewCount: 57,
          location: 'Los Angeles',
          isRemote: false,
          provider: {
            id: '107',
            name: 'Spotless Cleaning Co.',
            rating: 4.9,
          },
          imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
        {
          id: '8',
          title: 'Online Language Tutoring',
          description: 'Learn a new language from the comfort of your home with our experienced language tutors.',
          price: 35.00,
          duration: 60,
          category: 'Tutoring',
          categoryId: '5',
          rating: 4.8,
          reviewCount: 42,
          location: 'Chicago',
          isRemote: true,
          provider: {
            id: '108',
            name: 'Global Language Institute',
            rating: 4.7,
          },
          imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        },
      ];
      
      setServices(mockServices);
      setFilteredServices(mockServices);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query, category]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...services];
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(service => service.categoryId === selectedCategory);
    }
    
    // Apply search query filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(lowerQuery) ||
        service.description.toLowerCase().includes(lowerQuery) ||
        service.category.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(service => 
      service.price >= priceRange[0] && service.price <= priceRange[1]
    );
    
    // Apply rating filter
    if (ratingFilter !== null) {
      filtered = filtered.filter(service => service.rating >= ratingFilter);
    }
    
    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter(service => service.location === locationFilter);
    }
    
    // Apply remote filter
    if (isRemoteFilter !== null) {
      filtered = filtered.filter(service => service.isRemote === isRemoteFilter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      // For 'relevance', we keep the original order
      default:
        break;
    }
    
    setFilteredServices(filtered);
  }, [
    services, 
    searchQuery, 
    selectedCategory, 
    priceRange, 
    sortBy, 
    ratingFilter, 
    locationFilter, 
    isRemoteFilter
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    
    router.push(`/services/search?${params.toString()}`);
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 200]);
    setSortBy('relevance');
    setRatingFilter(null);
    setLocationFilter(null);
    setIsRemoteFilter(null);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ''}` : `${mins}m`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Find Services</h1>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search for services..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reset
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={selectedCategory === category.id}
                      onCheckedChange={(checked) => 
                        setSelectedCategory(checked ? category.id : '')
                      }
                    />
                    <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 200]}
                  max={200}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`rating-${rating}`} 
                      checked={ratingFilter === rating}
                      onCheckedChange={(checked) => 
                        setRatingFilter(checked ? rating : null)
                      }
                    />
                    <Label htmlFor={`rating-${rating}`} className="flex items-center">
                      {rating}+ <Star className="h-4 w-4 text-yellow-500 ml-1" />
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Location</h3>
              <Select value={locationFilter || ''} onValueChange={(value) => setLocationFilter(value || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Location</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Service Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remote-true" 
                    checked={isRemoteFilter === true}
                    onCheckedChange={(checked) => 
                      setIsRemoteFilter(checked ? true : null)
                    }
                  />
                  <Label htmlFor="remote-true">Remote/Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remote-false" 
                    checked={isRemoteFilter === false}
                    onCheckedChange={(checked) => 
                      setIsRemoteFilter(checked ? false : null)
                    }
                  />
                  <Label htmlFor="remote-false">In-Person</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          {/* Mobile Filters Button and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search results with these filters.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-category-${category.id}`} 
                              checked={selectedCategory === category.id}
                              onCheckedChange={(checked) => 
                                setSelectedCategory(checked ? category.id : '')
                              }
                            />
                            <Label htmlFor={`mobile-category-${category.id}`}>{category.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Price Range</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 200]}
                          max={200}
                          step={5}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}+</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Rating</h3>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-rating-${rating}`} 
                              checked={ratingFilter === rating}
                              onCheckedChange={(checked) => 
                                setRatingFilter(checked ? rating : null)
                              }
                            />
                            <Label htmlFor={`mobile-rating-${rating}`} className="flex items-center">
                              {rating}+ <Star className="h-4 w-4 text-yellow-500 ml-1" />
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Location</h3>
                      <Select value={locationFilter || ''} onValueChange={(value) => setLocationFilter(value || null)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Location</SelectItem>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Service Type</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="mobile-remote-true" 
                            checked={isRemoteFilter === true}
                            onCheckedChange={(checked) => 
                              setIsRemoteFilter(checked ? true : null)
                            }
                          />
                          <Label htmlFor="mobile-remote-true">Remote/Online</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="mobile-remote-false" 
                            checked={isRemoteFilter === false}
                            onCheckedChange={(checked) => 
                              setIsRemoteFilter(checked ? false : null)
                            }
                          />
                          <Label htmlFor="mobile-remote-false">In-Person</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <SheetFooter className="flex flex-row justify-between sm:justify-between">
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                    <SheetClose asChild>
                      <Button>Apply Filters</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              
              <div className="text-sm text-gray-500">
                {filteredServices.length} {filteredServices.length === 1 ? 'result' : 'results'}
              </div>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Applied Filters */}
          {(selectedCategory || ratingFilter !== null || locationFilter || isRemoteFilter !== null || priceRange[0] > 0 || priceRange[1] < 200) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500">Applied filters:</span>
              
              {selectedCategory && (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span>
                    Category: {categories.find(c => c.id === selectedCategory)?.name}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 p-0"
                    onClick={() => setSelectedCategory('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {(priceRange[0] > 0 || priceRange[1] < 200) && (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span>
                    Price: ${priceRange[0]} - ${priceRange[1]}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 p-0"
                    onClick={() => setPriceRange([0, 200])}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {ratingFilter !== null && (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span className="flex items-center">
                    Rating: {ratingFilter}+ <Star className="h-3 w-3 text-yellow-500 ml-1" />
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 p-0"
                    onClick={() => setRatingFilter(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {locationFilter && (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span>
                    Location: {locationFilter}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 p-0"
                    onClick={() => setLocationFilter(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {isRemoteFilter !== null && (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span>
                    {isRemoteFilter ? 'Remote/Online' : 'In-Person'}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 p-0"
                    onClick={() => setIsRemoteFilter(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-sm h-7 px-2"
                onClick={resetFilters}
              >
                Clear all
              </Button>
            </div>
          )}
          
          {/* Results List */}
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading services...</p>
              </div>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">No services found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search for something else.</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-1/3 md:min-h-[200px]">
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Image Placeholder</span>
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3 flex flex-col">
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold mb-2">
                              <Link href={`/services/${service.id}`} className="hover:text-primary">
                                {service.title}
                              </Link>
                            </h3>
                            <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 text-xs">
                              {service.category}
                            </div>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium">{service.rating}</span>
                            <span className="text-gray-500 ml-1">({service.reviewCount} reviews)</span>
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{formatDuration(service.duration)}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{service.isRemote ? 'Remote/Online' : service.location}</span>
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span>{service.provider.name}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <div className="text-xl font-bold">
                            ${service.price.toFixed(2)}
                            <span className="text-sm font-normal text-gray-500">/hour</span>
                          </div>
                          <Button asChild>
                            <Link href={`/services/${service.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}