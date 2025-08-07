"use client";

import { motion } from "framer-motion";
import { Shield, Star, Users, CheckCircle, Award, Clock, MapPin } from "lucide-react";

interface TrustBadgeProps {
  type: "verified" | "rating" | "users" | "completed" | "response" | "location" | "top-rated";
  value: string | number;
  label: string;
  variant?: "default" | "compact" | "large";
  showIcon?: boolean;
  className?: string;
  animated?: boolean;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  type,
  value,
  label,
  variant = "default",
  showIcon = true,
  className = "",
  animated = true
}) => {
  const getIcon = () => {
    switch (type) {
      case "verified":
        return <Shield className="w-5 h-5 text-green-600" />;
      case "rating":
        return <Star className="w-5 h-5 text-yellow-500 fill-current" />;
      case "users":
        return <Users className="w-5 h-5 text-primary" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "response":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "location":
        return <MapPin className="w-5 h-5 text-purple-600" />;
      case "top-rated":
        return <Award className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-primary" />;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "compact":
        return "px-3 py-2 text-sm";
      case "large":
        return "px-6 py-4 text-lg";
      default:
        return "px-4 py-3 text-base";
    }
  };

  const getTypeClasses = () => {
    switch (type) {
      case "verified":
        return "bg-green-50 border-green-200 text-green-800";
      case "rating":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "users":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "completed":
        return "bg-green-50 border-green-200 text-green-800";
      case "response":
        return "bg-purple-50 border-purple-200 text-purple-800";
      case "location":
        return "bg-indigo-50 border-indigo-200 text-indigo-800";
      case "top-rated":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const badgeContent = (
    <div className={`
      trust-badge 
      ${getVariantClasses()} 
      ${getTypeClasses()} 
      ${className}
      inline-flex items-center gap-2 rounded-full border font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg
    `}>
      {showIcon && getIcon()}
      <div className="flex items-center gap-1">
        <span className="font-bold">{value}</span>
        <span className="font-medium opacity-80">{label}</span>
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {badgeContent}
      </motion.div>
    );
  }

  return badgeContent;
};

// Pre-configured trust badges for common use cases
export const VerifiedBadge: React.FC<{ className?: string }> = ({ className }) => (
  <TrustBadge type="verified" value="✓" label="Verified" variant="compact" className={className} />
);

export const RatingBadge: React.FC<{ rating: number; className?: string }> = ({ rating, className }) => (
  <TrustBadge type="rating" value={rating} label="rating" variant="compact" className={className} />
);

export const TopRatedBadge: React.FC<{ className?: string }> = ({ className }) => (
  <TrustBadge type="top-rated" value="⭐" label="Top Rated" variant="compact" className={className} />
);

export const CompletedJobsBadge: React.FC<{ count: number; className?: string }> = ({ count, className }) => (
  <TrustBadge type="completed" value={count} label="jobs completed" variant="compact" className={className} />
);

export const ResponseTimeBadge: React.FC<{ time: string; className?: string }> = ({ time, className }) => (
  <TrustBadge type="response" value={time} label="response time" variant="compact" className={className} />
);

export default TrustBadge;