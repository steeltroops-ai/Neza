import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    iconUrl?: string;
    imageUrl?: string;
    serviceCount: number;
    popularServices?: string[];
  };
  variant?: 'grid' | 'list';
}

export function CategoryCard({ category, variant = 'grid' }: CategoryCardProps) {
  if (variant === 'grid') {
    return (
      <Link 
        href={`/services/search?category=${category.id}`} 
        className="block group"
      >
        <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md group-hover:border-primary">
          <CardContent className="p-0">
            <div className="relative h-40 bg-gray-100">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <img 
                  src={category.imageUrl || "/placeholder.svg"} 
                  alt={category.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button variant="secondary" size="sm">
                  View Services
                </Button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {category.description}
              </p>
              <div className="text-sm text-gray-500">
                {category.serviceCount} services available
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 hover:border-primary">
      <CardContent className="p-0">
        <Link href={`/services/search?category=${category.id}`} className="flex flex-col md:flex-row">
          <div className="relative md:w-1/4 h-40 md:h-auto bg-gray-100">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <img 
                src={category.imageUrl || "/placeholder.svg"} 
                alt={category.name} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          <div className="p-6 md:w-3/4">
            <h3 className="text-xl font-semibold mb-2">
              {category.name}
            </h3>
            <p className="text-gray-600 mb-4">
              {category.description}
            </p>
            <div className="text-sm text-gray-500 mb-4">
              {category.serviceCount} services available
            </div>
            {category.popularServices && category.popularServices.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Popular services:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                  {category.popularServices.map((service, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}