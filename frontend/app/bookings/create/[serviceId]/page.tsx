'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, Clock, User, MapPin, CreditCard, MessageSquare, 
  ChevronLeft, Info, AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatDate, formatCurrency } from '@/lib/utils';

// Mock service data for demonstration
const mockService = {
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
  location: 'Anytown, USA',
  availableDates: [
    '2023-08-15',
    '2023-08-16',
    '2023-08-17',
    '2023-08-18',
    '2023-08-19',
    '2023-08-20',
  ],
  availableTimeSlots: [
    { start: '09:00', end: '11:00' },
    { start: '11:30', end: '13:30' },
    { start: '14:00', end: '16:00' },
    { start: '16:30', end: '18:30' },
  ],
};

// Mock user data for demonstration
const mockCurrentUser = {
  id: '301',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  role: 'client',
  isAuthenticated: true,
};

export default function CreateBookingPage({ params }: { params: { serviceId: string } }) {
  const router = useRouter();
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    // In a real app, you would fetch service data from your API using the params.serviceId
    // For demo purposes, we'll use the mock data and add a delay
    const timer = setTimeout(() => {
      setService(mockService);
      setCurrentUser(mockCurrentUser);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [params.serviceId]);

  useEffect(() => {
    if (service) {
      setTotalAmount(service.price * quantity);
    }
  }, [service, quantity]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset time slot when date changes
    setErrors({ ...errors, date: undefined, timeSlot: undefined });
  };

  const handleTimeSlotSelect = (timeSlot: any) => {
    setSelectedTimeSlot(timeSlot);
    setErrors({ ...errors, timeSlot: undefined });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      setErrors({ ...errors, quantity: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!selectedDate) {
      newErrors.date = 'Please select a date';
    }
    
    if (!selectedTimeSlot) {
      newErrors.timeSlot = 'Please select a time slot';
    }
    
    if (quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    if (!currentUser.isAuthenticated) {
      // Redirect to login page if user is not authenticated
      router.push('/auth/login?redirect=' + encodeURIComponent(`/bookings/create/${params.serviceId}`));
      return;
    }
    
    // In a real app, you would send a request to your API to create the booking
    // For demo purposes, we'll just show an alert and redirect
    alert('Booking created successfully!');
    router.push('/bookings');
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

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Service
        </Button>

        <h1 className="text-3xl font-bold mb-6">Book Service</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Select Date</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {service.availableDates.map((date: string) => (
                      <Button
                        key={date}
                        type="button"
                        variant={selectedDate === date ? 'default' : 'outline'}
                        className="justify-start"
                        onClick={() => handleDateSelect(date)}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(date, 'MMM d, yyyy')}
                      </Button>
                    ))}
                  </div>
                  {errors.date && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Time Slot Selection */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Select Time Slot</h3>
                  {!selectedDate ? (
                    <p className="text-gray-500 italic">Please select a date first</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {service.availableTimeSlots.map((timeSlot: any, index: number) => (
                        <Button
                          key={index}
                          type="button"
                          variant={selectedTimeSlot === timeSlot ? 'default' : 'outline'}
                          className="justify-start"
                          onClick={() => handleTimeSlotSelect(timeSlot)}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          {timeSlot.start} - {timeSlot.end}
                        </Button>
                      ))}
                    </div>
                  )}
                  {errors.timeSlot && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.timeSlot}
                    </p>
                  )}
                </div>

                {/* Quantity Selection */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Quantity</h3>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 mx-2 text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                    <span className="ml-2 text-gray-500">{service.unit}(s)</span>
                  </div>
                  {errors.quantity && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.quantity}
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Additional Notes (Optional)</h3>
                  <textarea
                    className="w-full p-3 border rounded-md h-24"
                    placeholder="Add any special requests or information the service provider should know..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Service Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start mb-6">
                  <div 
                    className="w-20 h-20 rounded-md bg-cover bg-center mr-3 flex-shrink-0" 
                    style={{ backgroundImage: `url(${service.image})` }}
                  ></div>
                  <div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <div className="mt-1 flex items-center">
                      <div 
                        className="w-5 h-5 rounded-full bg-cover bg-center mr-1" 
                        style={{ backgroundImage: `url(${service.providerImage})` }}
                      ></div>
                      <span className="text-xs text-gray-600">{service.providerName}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Price per {service.unit}</span>
                    <span>{formatCurrency(service.price, service.currency)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Quantity</span>
                    <span>{quantity} {service.unit}(s)</span>
                  </div>
                  {selectedDate && selectedTimeSlot && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Date & Time</span>
                      <div className="text-right">
                        <div>{formatDate(selectedDate, 'MMM d, yyyy')}</div>
                        <div className="text-sm">{selectedTimeSlot.start} - {selectedTimeSlot.end}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between py-2 font-medium">
                    <span>Total Amount</span>
                    <span>{formatCurrency(totalAmount, service.currency)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  className="w-full" 
                  onClick={handleSubmit}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Confirm Booking
                </Button>
                <div className="text-xs text-gray-500 flex items-start">
                  <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                  <span>
                    By confirming this booking, you agree to our{' '}
                    <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}