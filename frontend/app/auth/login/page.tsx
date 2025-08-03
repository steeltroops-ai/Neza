'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, AlertCircle, LogIn, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers/ClerkAuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const { login, loginWithGoogle, isLoading, error: authError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', general: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setErrors({ email: '', password: '', general: '' });

    try {
      // Use the login function from ClerkAuthProvider
      await login(formData.email, formData.password);
      
      // If login is successful, the ClerkAuthProvider will redirect to dashboard
      // If there's a redirect URL in the query params, we'll handle that in the useEffect
    } catch (error) {
      console.error('Login error:', error);
      // The ClerkAuthProvider will handle setting the error state
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // Redirection is handled by the ClerkAuthProvider
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  // Add effect to handle redirect after successful login
  useEffect(() => {
    if (!isLoading && !authError && redirectTo) {
      router.push(redirectTo);
    }
  }, [isLoading, authError, redirectTo, router]);

  return (
    <motion.div 
      className="container max-w-md mx-auto py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="space-y-6">
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">Welcome back</h1>
          <p className="text-gray-500 mt-2">Sign in to your account to continue</p>
        </motion.div>

        {(errors.general || authError) && (
          <motion.div 
            className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 text-red-400 px-4 py-3 rounded-lg relative" 
            role="alert"
            variants={itemVariants}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="block sm:inline">{errors.general || authError}</span>
            </div>
          </motion.div>
        )}
        
        <motion.div variants={itemVariants}>
          <Button
            type="button"
            className="w-full bg-black/50 hover:bg-black/70 text-white border border-gray-700 flex items-center justify-center gap-2 py-6"
            onClick={handleGoogleLogin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
              <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
            Sign in with Google
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-gray-400">Or continue with email</span>
          </div>
        </motion.div>

        <motion.form onSubmit={handleSubmit} className="space-y-4" variants={containerVariants}>
          <motion.div className="space-y-2" variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`pl-10 bg-black/30 backdrop-blur-sm border-gray-700 ${errors.email ? 'border-red-500/50' : ''} text-white`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-red-400 text-xs mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className={`pl-10 bg-black/30 backdrop-blur-sm border-gray-700 ${errors.password ? 'border-red-500/50' : ''} text-white`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-300 focus:outline-none"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </motion.button>
              </div>
            </div>
            {errors.password && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-red-400 text-xs mt-1"
              >
                {errors.password}
              </motion.p>
            )}
          </motion.div>

          <motion.div className="flex items-center justify-between" variants={itemVariants}>
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-700 rounded bg-black/30"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/auth/forgot-password" className="font-medium bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text hover:from-indigo-300 hover:to-purple-300 transition-all duration-300">
                Forgot your password?
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <LogIn className="h-4 w-4" />
                  </motion.div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </Button>
          </motion.div>

          <motion.div className="text-center mt-4" variants={itemVariants}>
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link href="/auth/register" className="font-medium bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text hover:from-indigo-300 hover:to-purple-300 transition-all duration-300">
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}