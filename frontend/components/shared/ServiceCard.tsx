import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Clock, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    price: number;
    currency?: string;
    unit?: string;
    rating: number;
    reviewCount: number;
    image?: string;
    providerId: string;
    providerName: string;
    providerImage?: string;
    location: string;
    tags?: string[];
    categoryId?: string;
    category?: string;
  };
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card className="card-modern hover-lift group">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-lg">No Image</span>
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold">{service.rating}</span>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
              <Link href={`/services/${service.id}`}>
                {service.title}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {service.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{service.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>({service.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {service.providerImage ? (
                <div className="w-8 h-8 rounded-full overflow-hidden relative">
                  <Image
                    src={service.providerImage}
                    alt={service.providerName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-600">
                    {service.providerName.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900">{service.providerName}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                ${service.price}
                {service.unit && (
                  <span className="text-sm font-normal text-gray-500">/{service.unit}</span>
                )}
              </div>
            </div>
          </div>

          {service.tags && service.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {service.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Button asChild className="w-full btn-primary">
            <Link href={`/services/${service.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};