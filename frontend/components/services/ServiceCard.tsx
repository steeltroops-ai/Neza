import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Star, MapPin, Clock, DollarSign, User } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number; // in minutes
    category: string;
    categoryId: string;
    rating: number;
    reviewCount: number;
    location?: string;
    isRemote: boolean;
    provider: {
      id: string;
      name: string;
      rating: number;
    };
    imageUrl?: string;
  };
  variant?: 'grid' | 'list';
}

export function ServiceCard({ service, variant = 'grid' }: ServiceCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ''}` : `${mins}m`;
  };

  if (variant === 'grid') {
    return (
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary">
        <CardContent className="p-0">
          <div className="relative h-48 bg-gray-100">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <img 
                src={service.imageUrl || "/placeholder.svg"} 
                alt={service.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
              {service.category}
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-medium">{service.rating.toFixed(1)}</span>
              <span className="text-gray-500 ml-1">({service.reviewCount})</span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 line-clamp-1">
              <Link href={`/services/${service.id}`} className="hover:text-primary">
                {service.title}
              </Link>
            </h3>
            
            <p className="text-gray-600 mb-4 text-sm line-clamp-2">
              {service.description}
            </p>
            
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{service.isRemote ? 'Remote/Online' : service.location}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>{formatDuration(service.duration)}</span>
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="text-lg font-bold">
                ${service.price.toFixed(2)}
              </div>
              <Button asChild size="sm">
                <Link href={`/services/${service.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 hover:border-primary">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-48 md:h-auto md:w-1/3 md:min-h-[200px]">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <img 
              src={service.imageUrl || "/placeholder.svg"} 
              alt={service.title} 
              className="w-full h-full object-cover" 
            />
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
                <span className="font-medium">{service.rating.toFixed(1)}</span>
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
                <div className="flex items-center col-span-2">
                  <User className="h-4 w-4 mr-1" />
                  <span>{service.provider.name}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="text-xl font-bold">
                ${service.price.toFixed(2)}
                <span className="text-sm font-normal text-gray-500">/service</span>
              </div>
              <Button asChild>
                <Link href={`/services/${service.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}