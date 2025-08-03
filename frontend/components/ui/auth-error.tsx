'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';

interface AuthErrorProps {
  message?: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

export function AuthError({
  message = 'Authentication issue: Please contact support or check configuration',
  onClose,
  autoClose = true,
  autoCloseTime = 8000,
}: AuthErrorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50 max-w-md w-full bg-black/90 backdrop-blur-md border border-red-500/50 rounded-lg shadow-lg p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-red-400">Authentication Error</h3>
              <p className="text-gray-300 text-sm mt-1">{message}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}