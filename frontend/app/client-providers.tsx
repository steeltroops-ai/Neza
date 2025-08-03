'use client';

import { ReactNode, useState } from 'react';
import { Providers } from '../components/providers/Providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <Providers>{children}</Providers>
    </QueryClientProvider>
  );
}