"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, User, Search, Bell, Home, Briefcase, Grid, HelpCircle, Info } from "lucide-react";
import { Button } from "../ui/button";
import SignInButton from "../auth/SignInButton";
import { motion } from "framer-motion";

/**
 * Main navigation header component with responsive design.
 * Features mobile menu, navigation links, search, notifications, and authentication buttons.
 * Includes smooth animations and gradient styling.
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/", icon: "home" },
    { name: "Services", href: "/services", icon: "services" },
    { name: "Categories", href: "/categories", icon: "categories" },
    { name: "How It Works", href: "/#how-it-works", icon: "howItWorks" },
    { name: "About", href: "/about", icon: "about" },
  ];

  /**
   * Determines if a navigation path is currently active.
   * @param path - The path to check against current pathname
   * @returns True if the path is active, false otherwise
   */
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };
  
  /**
   * Maps icon names to their corresponding Lucide React components.
   * @param iconName - The name of the icon to render
   * @returns JSX element for the icon or null if not found
   */
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'home':
        return <Home className="h-4 w-4" />;
      case 'services':
        return <Briefcase className="h-4 w-4" />;
      case 'categories':
        return <Grid className="h-4 w-4" />;
      case 'howItWorks':
        return <HelpCircle className="h-4 w-4" />;
      case 'about':
        return <Info className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-gray-800/50 supports-backdrop-blur:bg-black/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 hover:scale-105 transition-transform duration-200">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">Neza</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                <Link
                  href={item.href}
                  className={`relative group rounded-lg inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-white bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {getIcon(item.icon)}
                    {item.name}
                  </span>
                  {isActive(item.href) && (
                    <span 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-fadeIn"
                    />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
              <SignInButton 
                variant="outline" 
                size="sm"
                modalTitle="Welcome to Neza"
                modalDescription="Sign in to access your account and services"
                className="rounded-full border border-gray-700 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 px-4"
              />
            </div>
            
            <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
              <Link href="/auth/register">
                <Button 
                  size="sm" 
                  className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 px-4"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div 
          className="md:hidden animate-fadeIn" 
          id="mobile-menu"
        >
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="hover:translate-x-1 transition-transform duration-200"
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive(item.href)
                      ? "border-indigo-500 text-white bg-white/5"
                      : "border-transparent text-gray-300 hover:bg-white/5 hover:border-gray-500 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getIcon(item.icon)}
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-800/50">
            <div className="flex items-center px-4 space-x-2">
              <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
                <SignInButton 
                  variant="outline" 
                  size="sm"
                  modalTitle="Welcome to Neza"
                  modalDescription="Sign in to access your account and services"
                  className="rounded-full border border-gray-700 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 px-4"
                />
              </div>
              <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
                <Link href="/auth/register">
                  <Button 
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 px-4"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
