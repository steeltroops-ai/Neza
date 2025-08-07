"use client";

import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle, Heart, MessageSquare, Clock, Award } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

interface ServiceCardProps {
  provider: {
    id: string | number;
    name: string;
    service: string;
    rating: number;
    reviews: number;
    image?: string;
    location: string;
    price: number;
    verified: boolean;
    responseTime: string;
    completedJobs: number;
    specialties: string[];
    available?: boolean;
    badge?: string;
  };
  variant?: "default" | "compact" | "featured";
  showFavorite?: boolean;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  provider, 
  variant = "default", 
  showFavorite = true,
  className = "" 
}) => {
  const cardVariants = {
    default: "card-modern p-6",
    compact: "card-modern p-4",
    featured: "card-premium p-8"
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle favorite logic here
    console.log(`Toggle favorite for ${provider.name}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`${cardVariants[variant]} group relative overflow-hidden ${className}`}
    >
      {/* Badge */}
      {provider.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full">
            {provider.badge}
          </span>
        </div>
      )}

      {/* Favorite Button */}
      {showFavorite && (
        <button
          onClick={handleFavorite}
          className="absolute top-4 left-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      )}

      <Link href={`/providers/${provider.id}`} className="block">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-bold text-white text-xl shadow-lg">
              {provider.name.charAt(0)}
            </div>
            
            {/* Verification Badge */}
            {provider.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}

            {/* Online Status */}
            {provider.available && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors mb-1 truncate">
              {provider.name}
            </h3>
            <p className="text-gray-600 mb-2 line-clamp-1">{provider.service}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-bold text-gray-900">{provider.rating}</span>
              </div>
              <span className="text-gray-500 text-sm">({provider.reviews} reviews)</span>
              {provider.rating >= 4.8 && (
                <Award className="w-4 h-4 text-yellow-500" title="Top Rated" />
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{provider.location}</span>
            </div>
          </div>

          {/* Price */}
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold text-primary">${provider.price}</div>
            <div className="text-sm text-gray-500">per hour</div>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {provider.specialties.slice(0, 3).map((specialty) => (
            <span
              key={specialty}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              {specialty}
            </span>
          ))}
          {provider.specialties.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
              +{provider.specialties.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>{provider.completedJobs} jobs completed</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Responds in {provider.responseTime}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            className="flex-1 btn-primary group-hover:shadow-glow transition-all duration-200"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/book/${provider.id}`;
            }}
          >
            Book Now
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="px-4 border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-200"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/messages/${provider.id}`;
            }}
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </Link>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default ServiceCard;