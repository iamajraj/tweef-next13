'use client';

import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="flex h-screen max-w-7xl mx-auto">
      <LeftSide />
      {children}
      <RightSide />
    </div>
  );
}

export default Layout;
