'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  CheckCircle,
  ArrowLeft,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const serviceId = searchParams.get('service');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const quantity = searchParams.get('quantity') || '1';
  
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // In a real app, you would fetch the service details from your API
    // For demo purposes, we'll use mock data and add a delay
    const timer = setTimeout(() => {
      setService({
        id: serviceId,
        title: 'Professional House Cleaning Service',
        price: 75.00,
        currency: 'USD',
        unit: 'hour',
        provider: {
          id: '101',
          name: 'Clean Pro Services',
        },
        location: 'Client location',
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [serviceId]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // In a real app, you would call your booking API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to success page
      router.push('/dashboard/bookings/success?id=123456');
    } catch (error) {
      console.error('Error creating booking:', error);
      setIsSubmitting(false);
      // Show error message
    }
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

  if (!service) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Service Not Found</h1>
          <p className="mt-4 text-gray-600">The service you're trying to book doesn't exist or has been removed.</p>
          <Button className="mt-6" asChild>
            <Link href="/services">Browse Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }) : 'Not specified';
  
  const totalPrice = service.price * parseInt(quantity);
  const serviceFee = totalPrice * 0.05; // 5% service fee
  const grandTotal = totalPrice + serviceFee;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href={`/services/${serviceId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Service
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Confirm Your Booking</h1>
            <p className="text-gray-500 mt-2">Please review your booking details before proceeding to payment.</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Service information and schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{service.title}</h3>
                <p className="text-gray-500">Provided by {service.provider.name}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-gray-600">{formattedDate}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-gray-600">{time || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{service.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-gray-600">{quantity} {parseInt(quantity) === 1 ? service.unit : `${service.unit}s`}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <label htmlFor="special-instructions" className="block font-medium mb-2">Special Instructions (Optional)</label>
                <Textarea
                  id="special-instructions"
                  placeholder="Add any special instructions or requirements for the service provider..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select how you'd like to pay</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center cursor-pointer">
                    <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Credit/Debit Card</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex items-center cursor-pointer">
                    <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Wallet Balance</span>
                  </Label>
                </div>
              </RadioGroup>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  Payment will be processed securely. You will only be charged after the service has been completed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{service.title}</span>
                  <span>${service.price.toFixed(2)}/{service.unit}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span>{quantity} {parseInt(quantity) === 1 ? service.unit : `${service.unit}s`}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  By confirming, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}