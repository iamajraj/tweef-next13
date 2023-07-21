'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';

type Props = {
  children: React.ReactNode;
};

const client = new QueryClient();

function Provider({ children }: Props) {
  return (
    <QueryClientProvider client={client}>
      {' '}
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}

export default Provider;
