import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, User, DollarSign } from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface BookingCardProps {
  booking: {
    id: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    date: string;
    time: string;
    totalAmount: number;
    currency?: string;
    location: string;
    service: {
      id: string;
      title: string;
      image: string;
    };
    provider: {
      id: string;
      name: string;
      avatar?: string;
    };
  };
  variant?: 'default' | 'compact';
  className?: string;
}

const BookingCard = ({ booking, variant = 'default', className = '' }: BookingCardProps) => {
  const { id, status, date, time, totalAmount, currency = 'USD', location, service, provider } = booking;
  const isCompact = variant === 'compact';
  
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };
  
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${className}`}>
      {!isCompact && (
        <div className="relative h-40 w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
          <Badge 
            variant={getStatusVariant(status) as any} 
            className="absolute top-2 right-2 z-10"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      )}
      
      <CardContent className={`p-4 ${isCompact ? 'flex items-center gap-3' : ''}`}>
        {isCompact && (
          <Badge variant={getStatusVariant(status) as any}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )}
        
        <div className={isCompact ? 'flex-1' : ''}>
          <h3 className={`font-semibold ${isCompact ? 'text-base' : 'text-lg'} mb-2`}>
            {service.title}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formattedDate}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>{time}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="line-clamp-1">{location}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-2" />
              <span>{provider.name}</span>
            </div>
            
            <div className="flex items-center text-sm font-medium">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>{formatCurrency(totalAmount, currency)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center border-t">
        <Button asChild variant="outline" size="sm">
          <Link href={`/bookings/${id}`}>View Details</Link>
        </Button>
        
        {status === 'pending' && (
          <Button asChild size="sm">
            <Link href={`/bookings/${id}`}>Confirm</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookingCard;