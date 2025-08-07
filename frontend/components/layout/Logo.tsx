"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  variant?: "default" | "white" | "dark";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "default",
  size = "md",
  showText = true,
  className = ""
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "white":
        return "text-white";
      case "dark":
        return "text-gray-900";
      default:
        return "text-gray-900";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return { icon: "w-8 h-8", text: "text-xl" };
      case "lg":
        return { icon: "w-12 h-12", text: "text-3xl" };
      default:
        return { icon: "w-10 h-10", text: "text-2xl" };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ duration: 0.2 }}
        className={`${sizeClasses.icon} rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-bold text-white shadow-lg group-hover:shadow-xl transition-shadow`}
      >
        N
      </motion.div>
      
      {showText && (
        <motion.div
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
          className={`${sizeClasses.text} font-bold ${getVariantClasses()} tracking-tight`}
        >
          <span className="text-gradient">Neza</span>
        </motion.div>
      )}
    </Link>
  );
};

export default Logo;