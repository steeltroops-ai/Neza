import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  unit: string;
  rating: number;
  reviewCount: number;
  provider: {
    id: string;
    name: string;
    avatar: string;
  };
  image: string;
}

interface ServiceCardProps {
  service: Service;
}

/**
 * Service card component displaying service information in a clickable card format.
 * Shows service title, description, pricing, rating, and provider information.
 * Features hover effects and responsive design.
 * 
 * @param service - Service object containing all service details
 * @returns JSX element representing a service card
 */
export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-48 w-full">
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
            <span className="text-white text-4xl">🚀</span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-2">{service.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {service.description}
          </p>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium ml-1">{service.rating}</span>
              <span className="text-sm text-gray-500 ml-1">
                ({service.reviewCount})
              </span>
            </div>
            <Badge variant="secondary">
              ${service.price} / {service.unit}
            </Badge>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
              <span className="text-xs">👤</span>
            </div>
            <span className="text-sm text-gray-600">{service.provider.name}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}