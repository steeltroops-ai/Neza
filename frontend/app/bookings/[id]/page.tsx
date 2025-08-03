'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, Clock, User, MapPin, CreditCard, MessageSquare, 
  CheckCircle, XCircle, AlertCircle, ChevronLeft, Edit, Trash2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, formatCurrency } from '@/lib/utils';

// Mock booking data for demonstration
const mockBooking = {
  id: '1',
  serviceId: '101',
  serviceName: 'Professional House Cleaning',
  serviceImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  providerId: '201',
  providerName: 'CleanPro Services',
  providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  clientId: '301',
  clientName: 'John Doe',
  startDate: '2023-08-15T10:00:00.000Z',
  endDate: '2023-08-15T12:00:00.000Z',
  status: 'confirmed', // 'pending', 'confirmed', 'completed', 'cancelled'
  price: 75,
  currency: 'USD',
  quantity: 1,
  totalAmount: 75,
  location: '123 Main St, Anytown, USA',
  notes: 'Please bring eco-friendly cleaning supplies. The front door code is 1234.',
  paymentStatus: 'paid', // 'pending', 'paid', 'refunded'
  createdAt: '2023-08-01T14:30:00.000Z',
  updatedAt: '2023-08-02T09:15:00.000Z',
};

// Mock user data for demonstration
const mockCurrentUser = {
  id: '301', // Same as clientId in the booking to simulate the client view
  role: 'client', // 'client' or 'provider'
};

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [isProvider, setIsProvider] = useState(false);
  const [confirmCancelDialog, setConfirmCancelDialog] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch booking data from your API using the params.id
    // For demo purposes, we'll use the mock data and add a delay
    const timer = setTimeout(() => {
      setBooking(mockBooking);
      setCurrentUser(mockCurrentUser);
      setIsClient(mockCurrentUser.id === mockBooking.clientId);
      setIsProvider(mockCurrentUser.id === mockBooking.providerId);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [params.id]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPaymentStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelBooking = () => {
    // In a real app, you would send a request to your API to cancel the booking
    // For demo purposes, we'll just update the local state
    setBooking(prev => ({
      ...prev,
      status: 'cancelled',
    }));
    setConfirmCancelDialog(false);
    
    // Show success message (in a real app, you might use a toast notification)
    alert('Booking cancelled successfully!');
  };

  const handleEditBooking = () => {
    // In a real app, you would redirect to an edit page or open a modal
    // For demo purposes, we'll just redirect to a hypothetical edit page
    router.push(`/bookings/edit/${params.id}`);
  };

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
          Back to Bookings
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold">Booking Details</h1>
          
          <div className="flex items-center mt-4 md:mt-0">
            <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusBadgeClass(booking.status)}`}>
              {getStatusIcon(booking.status)}
              <span className="ml-1 capitalize">{booking.status}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Booking Info */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Service Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start mb-6">
                  <div 
                    className="w-24 h-24 rounded-md bg-cover bg-center mr-4 flex-shrink-0" 
                    style={{ backgroundImage: `url(${booking.serviceImage})` }}
                  ></div>
                  <div>
                    <h3 className="text-xl font-semibold">{booking.serviceName}</h3>
                    <div className="mt-2 flex items-center">
                      <div 
                        className="w-8 h-8 rounded-full bg-cover bg-center mr-2" 
                        style={{ backgroundImage: `url(${booking.providerImage})` }}
                      ></div>
                      <span className="text-gray-600">{booking.providerName}</span>
                    </div>
                    <div className="mt-2">
                      <span className="font-medium">{formatCurrency(booking.price, booking.currency)}</span>
                      <span className="text-gray-500"> × {booking.quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-gray-600">
                        {formatDate(booking.startDate, 'PPP')} • {formatDate(booking.startDate, 'p')} - {formatDate(booking.endDate, 'p')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{booking.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Client</p>
                      <p className="text-gray-600">{booking.clientName}</p>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="flex items-start">
                      <MessageSquare className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Notes</p>
                        <p className="text-gray-600">{booking.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Service Fee</span>
                    <span>{formatCurrency(booking.price, booking.currency)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Quantity</span>
                    <span>{booking.quantity}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-b">
                    <span className="font-medium">Total Amount</span>
                    <span className="font-medium">{formatCurrency(booking.totalAmount, booking.currency)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Payment Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadgeClass(booking.paymentStatus)}`}>
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </CardContent>
              {booking.paymentStatus === 'pending' && isClient && (
                <CardFooter>
                  <Button className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Make Payment
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>

          {/* Booking Actions */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Booking Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Show different actions based on booking status and user role */}
                {booking.status === 'pending' && isProvider && (
                  <Button className="w-full" variant="default">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm Booking
                  </Button>
                )}

                {booking.status === 'confirmed' && isProvider && (
                  <Button className="w-full" variant="default">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </Button>
                )}

                {(booking.status === 'pending' || booking.status === 'confirmed') && (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleEditBooking()}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Booking
                  </Button>
                )}

                {(booking.status === 'pending' || booking.status === 'confirmed') && (
                  <Button 
                    className="w-full" 
                    variant="destructive"
                    onClick={() => setConfirmCancelDialog(true)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Booking
                  </Button>
                )}

                {booking.status === 'completed' && (
                  <Button className="w-full" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Leave a Review
                  </Button>
                )}

                <Button 
                  className="w-full" 
                  variant="outline"
                  asChild
                >
                  <Link href={`/services/${booking.serviceId}`}>
                    View Service
                  </Link>
                </Button>

                {isClient && (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    asChild
                  >
                    <Link href={`/messages?provider=${booking.providerId}`}>
                      Contact Provider
                    </Link>
                  </Button>
                )}

                {isProvider && (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    asChild
                  >
                    <Link href={`/messages?client=${booking.clientId}`}>
                      Contact Client
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Booking Timeline */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Booking Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 relative">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -ml-px bg-gray-200"></div>
                    </div>
                    <div>
                      <p className="font-medium">Booking Created</p>
                      <p className="text-sm text-gray-500">{formatDate(booking.createdAt, 'PPp')}</p>
                    </div>
                  </div>

                  {booking.status !== 'pending' && (
                    <div className="flex items-start">
                      <div className="mr-3 relative">
                        <div className={`h-8 w-8 rounded-full ${booking.status === 'cancelled' ? 'bg-red-100' : 'bg-blue-100'} flex items-center justify-center`}>
                          {booking.status === 'cancelled' ? (
                            <XCircle className="h-4 w-4 text-red-600" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        {booking.status === 'completed' && (
                          <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -ml-px bg-gray-200"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {booking.status === 'confirmed' && 'Booking Confirmed'}
                          {booking.status === 'cancelled' && 'Booking Cancelled'}
                          {booking.status === 'completed' && 'Service Confirmed'}
                        </p>
                        <p className="text-sm text-gray-500">{formatDate(booking.updatedAt, 'PPp')}</p>
                      </div>
                    </div>
                  )}

                  {booking.status === 'completed' && (
                    <div className="flex items-start">
                      <div className="mr-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Service Completed</p>
                        <p className="text-sm text-gray-500">{formatDate(booking.endDate, 'PPp')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog for Cancellation */}
      {confirmCancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Confirm Cancellation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Are you sure you want to cancel this booking? This action cannot be undone.</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setConfirmCancelDialog(false)}>
                No, Keep Booking
              </Button>
              <Button variant="destructive" onClick={handleCancelBooking}>
                Yes, Cancel Booking
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}