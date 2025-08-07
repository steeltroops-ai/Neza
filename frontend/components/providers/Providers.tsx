'use client';

import { ReactNode } from 'react';
import { ClerkAuthProvider } from './ClerkAuthProvider';

export function Providers({ children }: { children: ReactNode }) {
  return <ClerkAuthProvider>{children}</ClerkAuthProvider>;
}