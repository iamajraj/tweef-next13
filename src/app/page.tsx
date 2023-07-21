'use client';

import LeftSide from '../components/LeftSide';
import Main from '../components/Main';
import RightSide from '../components/RightSide';

export default function Home() {
  return (
    <main className="flex h-screen max-w-7xl mx-auto">
      <LeftSide />
      <Main />
      <RightSide />
    </main>
  );
}
