import { signOut, useSession } from 'next-auth/react';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const OPTIONS = [
  'Home',
  'Explore',
  'Notifications',
  'Message',
  'Lists',
  'Bookmarks',
  'Communities',
  'Verified',
  'Profile',
  'More',
];

function LeftSide({ ...props }: Props) {
  const { data: session } = useSession();

  return (
    <div
      {...props}
      className="w-1/4 h-full flex flex-col justify-between border-r pr-10 border-r-gray-800 pb-5 sticky top-0"
    >
      <div className="mt-5">
        <img
          src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
          alt="logo"
          className="ml-4 w-8 rounded-full object-cover mb-10"
        />
        {OPTIONS.map((op) => (
          <p
            key={op}
            className="py-3 px-4 text-[18px] rounded-full hover:bg-slate-200/10 cursor-pointer"
          >
            {op}
          </p>
        ))}
        <button className="bg-blue-500 w-full rounded-full py-4 mt-5 cursor-pointer hover:bg-blue-400 transition-all">
          Tweef
        </button>
      </div>

      <div
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: '/',
          })
        }
        className="flex items-center justify-between rounded-full hover:bg-slate-200/10 cursor-pointer px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <img
            src={session?.user.image ?? undefined}
            alt="profile"
            className="w-8 rounded-full"
            referrerPolicy="no-referrer"
          />
          <div className="">
            <p className="text-sm">{session?.user.name}</p>
            <span className="text-sm">{session?.user.email}</span>
          </div>
        </div>
        <p className="w-max">...</p>
      </div>
    </div>
  );
}

export default LeftSide;
