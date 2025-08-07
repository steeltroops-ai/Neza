"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Grid, Briefcase, User, Info, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';

const categories = [
  { name: 'All Categories', icon: Grid },
  { name: 'Services', icon: Briefcase },
  { name: 'Providers', icon: User },
  { name: 'About', icon: Info },
  { name: 'Contact', icon: Phone },
];

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      "use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Grid, Briefcase, User, Info, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';

const categories = [
  { name: 'All', icon: Grid },
  { name: 'Services', icon: Briefcase },
  { name: 'Providers', icon: User },
];

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

const SearchBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full max-w-2xl flex items-center bg-white rounded-full border-2 border-transparent shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
      <div className="relative" ref={dropdownRef}>
        <Button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 h-12 pl-5 pr-3 bg-gray-100 rounded-l-full border-r border-gray-200 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
        >
          <span className="text-sm font-semibold">{selectedCategory.name}</span>
          <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </Button>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-100 overflow-hidden"
            >
              <div className="p-2">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    onClick={() => handleCategorySelect(category)}
                    className="flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-800 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    <category.icon className="w-5 h-5 text-gray-500" />
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <input
        type="text"
        placeholder="Search for services, providers, and more..."
        className="w-full h-12 px-4 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
      />
      <div className="p-1">
        <Button size="icon" className="rounded-full bg-blue-500 hover:bg-blue-600 h-10 w-10 flex-shrink-0">
          <Search className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;

    };
  }, [ref, handler]);
};

const SearchBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full max-w-2xl flex items-center bg-white rounded-full border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all duration-300">
      <div className="relative" ref={dropdownRef}>
        <Button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 h-full pl-4 pr-2 bg-gray-100 rounded-l-full border-r border-gray-300 text-gray-600 hover:bg-gray-200"
        >
          <selectedCategory.icon className="w-5 h-5" />
          <span className="hidden md:block text-sm font-medium">{selectedCategory.name}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-200/80 overflow-hidden"
            >
              <div className="p-2">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    onClick={() => handleCategorySelect(category)}
                    className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    <category.icon className="w-5 h-5 text-gray-500" />
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <input
        type="text"
        placeholder={`Search in ${selectedCategory.name}...`}
        className="w-full px-4 py-2.5 bg-transparent focus:outline-none text-gray-800"
      />
      <Button size="icon" className="rounded-r-full bg-blue-500 hover:bg-blue-600 h-full">
        <Search className="w-5 h-5 text-white" />
      </Button>
    </div>
  );
};

export default SearchBar;
