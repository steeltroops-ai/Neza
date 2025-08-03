'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, you would fetch the booking details from your API
    // For demo purposes, we'll use mock data and add a delay
    const timer = setTimeout(() => {
      setBooking({
        id: bookingId || '123456',
        service: 'Professional House Cleaning Service',
        provider: 'Clean Pro Services',
        date: '2023-12-15',
        time: '10:00 AM',
        status: 'confirmed',
        totalPrice: 157.50,
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [bookingId]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  const formattedDate = booking ? new Date(booking.date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }) : 'Not specified';

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <Card className="text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold">Booking Confirmed!</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-gray-600 text-lg">
            Your booking for <span className="font-semibold">{booking.service}</span> has been successfully confirmed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
            <div className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-500">Booking ID:</div>
                <div className="font-medium">{booking.id}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-500">Service:</div>
                <div className="font-medium">{booking.service}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-500">Provider:</div>
                <div className="font-medium">{booking.provider}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-500">Date:</div>
                <div className="font-medium">{formattedDate}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-500">Time:</div>
                <div className="font-medium">{booking.time}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-500">Total Amount:</div>
                <div className="font-medium">${booking.totalPrice.toFixed(2)}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-500">Status:</div>
                <div className="font-medium text-green-600 capitalize">{booking.status}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 text-blue-700 text-sm flex items-start max-w-md mx-auto">
            <Calendar className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>
              We've sent a confirmation email with all the details. You can also view and manage your booking in your dashboard.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Button asChild>
            <Link href="/dashboard/client/bookings">
              View My Bookings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/services">
              Browse More Services
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}