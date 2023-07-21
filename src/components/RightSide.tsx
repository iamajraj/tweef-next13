'use client';

import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const TRENDS = [
  'dddd',
  'Why you?',
  'here?',
  'No way',
  'ho shouts?',
  'Any any any',
];

function RightSide({ ...props }: Props) {
  return (
    <div
      className="w-1/3 h-full flex flex-col border-l pl-8 border-l-gray-800 pt-5 gap-5"
      {...props}
    >
      <div className="bg-[#202327] rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent text-sm outline-none border-none"
        />
      </div>
      <div className="bg-[#202327] rounded-xl p-4">
        <h2 className="font-bold text-lg">Get Verified</h2>
        <p className="text-sm font-bold">Subscribe to get unlocked features</p>
        <button className="py-2 px-6 bg-[#1A8CD8] rounded-full mt-3 font-bold">
          Get Verified
        </button>
      </div>

      <div className="py-5 bg-[#202327] rounded-lg">
        <h2 className="px-4 font-bold text-lg">Trends for you</h2>
        <div className="mt-4 flex flex-col">
          {TRENDS.map((tr) => (
            <div className="py-3 flex flex-col hover:bg-[#1D1F23] cursor-pointer px-4">
              <span className="text-[12px] text-gray-400">Tech</span>
              <p className="text-[15px] font-bold">{tr}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightSide;
