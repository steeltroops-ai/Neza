'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, DollarSign, Star, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Mock data for demonstration
const mockService = {
  id: '1',
  title: 'Professional House Cleaning Service',
  description: 'Comprehensive house cleaning service including dusting, vacuuming, mopping, bathroom cleaning, kitchen cleaning, and more. We use eco-friendly products and provide exceptional attention to detail.',
  price: 75.00,
  currency: 'USD',
  unit: 'hour',
  rating: 4.8,
  reviewCount: 124,
  imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  provider: {
    id: '101',
    name: 'Clean Pro Services',
    rating: 4.9,
    reviewCount: 312,
    responseTime: '1 hour',
    memberSince: 'January 2020',
    imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  tags: ['Cleaning', 'House Cleaning', 'Eco-friendly'],
  location: 'Serves New York City and surrounding areas',
  availability: [
    { date: '2023-12-15', slots: ['09:00', '13:00', '16:00'] },
    { date: '2023-12-16', slots: ['10:00', '14:00'] },
    { date: '2023-12-17', slots: ['09:00', '11:00', '15:00'] },
  ],
  reviews: [
    {
      id: '201',
      user: 'Sarah Johnson',
      rating: 5,
      date: '2023-11-10',
      comment: 'Excellent service! My house has never been cleaner. The team was professional, thorough, and friendly.',
      userImageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
    {
      id: '202',
      user: 'Michael Brown',
      rating: 4,
      date: '2023-10-25',
      comment: 'Very good cleaning service. They did miss a few spots under the furniture, but overall I was satisfied with the result.',
      userImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '203',
      user: 'Emily Davis',
      rating: 5,
      date: '2023-10-15',
      comment: 'I\'ve been using Clean Pro Services for 6 months now and they never disappoint. Highly recommended!',
      userImageUrl: 'https://randomuser.me/api/portraits/women/56.jpg',
    },
  ],
};

export default function ServiceDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the service data from your API
    // For demo purposes, we'll use the mock data and add a delay
    const timer = setTimeout(() => {
      setService(mockService);
      setIsLoading(false);
      // For demo purposes, randomly set authentication status
      setIsAuthenticated(Math.random() > 0.5);
    }, 1000);

    return () => clearTimeout(timer);
  }, [params.id]);

  const handleBooking = async () => {
    try {
      // Import dynamically to avoid SSR issues
      const authModule = await import('@/lib/auth');
      
      // Check if user is authenticated by checking localStorage directly
      const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('user') !== null;
      
      if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        router.push('/auth/login?redirect=' + encodeURIComponent(`/services/${params.id}`));
        return;
      }

      if (!selectedDate || !selectedTime) {
        alert('Please select a date and time for your booking');
        return;
      }

      // In a real app, you would call your booking API
      console.log('Booking service', {
        serviceId: params.id,
        date: selectedDate,
        time: selectedTime,
        quantity,
      });

      // Redirect to booking confirmation page
      router.push(`/dashboard/bookings/confirmation?service=${params.id}&date=${selectedDate}&time=${selectedTime}&quantity=${quantity}`);
    } catch (error) {
      console.error('Error during booking:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Service Not Found</h1>
          <p className="mt-4 text-gray-600">The service you\'re looking for doesn\'t exist or has been removed.</p>
          <Button className="mt-6" asChild>
            <Link href="/services">Browse Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Service Image and Basic Info */}
          <div className="space-y-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image 
                src={service.imageUrl} 
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold">{service.title}</h1>
              
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-medium">{service.rating}</span>
                  <span className="text-gray-500 ml-1">({service.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-1" />
                  <span className="text-gray-500">{service.location}</span>
                </div>
              </div>

              <div className="flex items-center mt-4">
                <div className="h-10 w-10 rounded-full overflow-hidden relative mr-3">
                  <Image 
                    src={service.provider.imageUrl} 
                    alt={service.provider.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Provided by {service.provider.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{service.provider.rating} ({service.provider.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">About This Service</h2>
            <p className="text-gray-700 whitespace-pre-line">{service.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {service.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Provider Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">About The Provider</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image 
                      src={service.provider.imageUrl} 
                      alt={service.provider.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">{service.provider.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{service.provider.rating}</span>
                      <span className="text-gray-500 ml-1">({service.provider.reviewCount} reviews)</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Response time: {service.provider.responseTime}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>Member since: {service.provider.memberSince}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-2" asChild>
                      <Link href={`/providers/${service.provider.id}`}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Provider
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Reviews</h2>
              <span className="text-gray-500">{service.reviewCount} reviews</span>
            </div>
            
            <div className="space-y-4">
              {service.reviews.map((review: any) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full overflow-hidden relative flex-shrink-0">
                        <Image 
                          src={review.userImageUrl} 
                          alt={review.user}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2 w-full">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{review.user}</h4>
                            <p className="text-gray-500 text-sm">{review.date}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                                fill={i < review.rating ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {service.reviewCount > service.reviews.length && (
                <div className="text-center mt-4">
                  <Button variant="outline">
                    View All Reviews
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">
                    ${service.price.toFixed(2)}
                    <span className="text-gray-500 text-base font-normal">/{service.unit}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Date
                    </label>
                    <select
                      id="date"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedTime('');
                      }}
                    >
                      <option value="">Select a date</option>
                      {service.availability.map((day: any) => (
                        <option key={day.date} value={day.date}>
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedDate && (
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        Select Time
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {service.availability
                          .find((day: any) => day.date === selectedDate)?.slots
                          .map((slot: string) => (
                            <button
                              key={slot}
                              type="button"
                              className={`py-2 px-3 text-sm border rounded-md ${selectedTime === slot ? 'bg-primary text-white border-primary' : 'border-gray-300 hover:border-primary'}`}
                              onClick={() => setSelectedTime(slot)}
                            >
                              {slot}
                            </button>
                          ))
                        }
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Hours Needed
                    </label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="p-2 border border-gray-300 rounded-l-md"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <Input
                        type="number"
                        id="quantity"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="text-center border-y border-gray-300 rounded-none"
                      />
                      <button
                        type="button"
                        className="p-2 border border-gray-300 rounded-r-md"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Price per {service.unit}</span>
                      <span>${service.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Quantity</span>
                      <span>{quantity} {quantity === 1 ? service.unit : `${service.unit}s`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>${(service.price * quantity).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleBooking}
                  >
                    {isAuthenticated ? 'Book Now' : 'Login to Book'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    You won\'t be charged yet. Payment will be collected after service completion.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}