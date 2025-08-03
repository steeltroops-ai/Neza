'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

interface SignInButtonProps extends ButtonProps {
  redirectUrl?: string;
  showIcon?: boolean;
  modalTitle?: string;
  modalDescription?: string;
}

export default function SignInButton({
  children = 'Sign In',
  redirectUrl = '/dashboard',
  showIcon = true,
  modalTitle,
  modalDescription,
  className,
  variant,
  size,
  ...props
}: SignInButtonProps) {
  return (
    <Link href="/auth/login">
      <Button
        variant={variant || 'default'}
        size={size || 'default'}
        className={className}
        {...props}
      >
        {showIcon && <LogIn className="mr-2 h-4 w-4" />}
        {children}
      </Button>
    </Link>
  );
}