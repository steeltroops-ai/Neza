"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, Users } from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon: React.ReactNode;
    count: number;
    colorClass: string;
    description: string;
    trending?: boolean;
    avgPrice?: string;
    growth?: string;
  };
  variant?: "default" | "compact" | "large";
  showStats?: boolean;
  className?: string;
  index?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  variant = "default",
  showStats = true,
  className = "",
  index = 0
}) => {
  const cardVariants = {
    default: "p-8",
    compact: "p-6",
    large: "p-10"
  };

  const iconSizes = {
    default: "w-20 h-20",
    compact: "w-16 h-16", 
    large: "w-24 h-24"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group ${className}`}
    >
      <Link href={`/services/category/${category.id}`}>
        <div className={`card-modern ${cardVariants[variant]} text-center relative overflow-hidden`}>
          {/* Trending Badge */}
          {category.trending && (
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1 animate-pulse">
                <TrendingUp className="w-3 h-3" />
                Hot
              </div>
            </div>
          )}

          {/* Growth Indicator */}
          {category.growth && (
            <div className="absolute top-4 left-4">
              <div className="px-2 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full">
                +{category.growth}
              </div>
            </div>
          )}

          {/* Icon */}
          <div className={`${iconSizes[variant]} mx-auto mb-6 rounded-2xl ${category.colorClass} flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg animate-float`}>
            {category.icon}
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
          
          {/* Stats */}
          {showStats && (
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{category.count} providers</span>
                </div>
                {category.avgPrice && (
                  <div className="font-bold text-primary">{category.avgPrice}</div>
                )}
              </div>
              
              {/* Provider Quality Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 group-hover:animate-gradient"
                  style={{ width: `${Math.min(90, (category.count / 15))}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">Provider availability</div>
            </div>
          )}

          {/* Hover Effects */}
          <div className="relative overflow-hidden">
            {/* Hover Arrow */}
            <div className="flex items-center justify-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/30 to-transparent rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/30 to-transparent rounded-full translate-y-12 -translate-x-12" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;