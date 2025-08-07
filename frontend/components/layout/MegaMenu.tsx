"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Home, Zap, Heart, Shield, Wind, Droplets, Car, PawPrint } from 'lucide-react';

const categories = [
  { name: 'Cleaning', icon: Droplets, href: '/services/cleaning' },
  { name: 'Plumbing', icon: Wind, href: '/services/plumbing' },
  { name: 'Electrical', icon: Zap, href: '/services/electrical' },
  { name: 'Home Repair', icon: Home, href: '/services/home-repair' },
  { name: 'Auto Repair', icon: Car, href: '/services/auto-repair' },
  { name: 'Pet Care', icon: PawPrint, href: '/services/pet-care' },
  { name: 'Health & Wellness', icon: Heart, href: '/services/health-wellness' },
  { name: 'Security', icon: Shield, href: '/services/security' },
];

const MegaMenu = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200/80 z-40"
          onMouseLeave={onClose}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {categories.map((category) => (
                <Link key={category.name} href={category.href} passHref>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{category.name}</p>
                      <p className="text-sm text-gray-500">Find services</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
