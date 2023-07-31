'use client';

import React from 'react';
import LeftSide from '../../../components/LeftSide';
import RightSide from '../../../components/RightSide';
import Layout from '../../../components/Layout';

type Props = {
  params: { id: string };
};

function Tweef({ params }: Props) {
  console.log(params);
  return (
    <Layout>
      <div className="flex-1">
        <div className="flex items-center gap-4 px-4 py-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <p>Tweefs</p>
        </div>
      </div>
    </Layout>
  );
}

export default Tweef;
