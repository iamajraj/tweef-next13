'use client';

import { useSession } from 'next-auth/react';
import React, { useMemo } from 'react';
import { addRemoveLike } from '../actions/addRemoveLike';

type Props = { tweef: TweefT; refetch: () => Promise<void> };

function Tweef({ tweef, refetch }: Props) {
  console.log(tweef);
  const { data } = useSession();

  const currentUserLiked = useMemo(() => {
    if (data?.user) {
      return tweef.like.includes(data.user.id);
    } else {
      return false;
    }
  }, [tweef, data]);

  const handleLike = async (userId?: string) => {
    if (!userId) return;
    await addRemoveLike({
      tweefId: tweef.id,
      userId: userId,
    });

    await refetch();
  };

  return (
    <div className="flex flex-col border-b border-gray-800 pb-5">
      <div className="flex items-center gap-2">
        <img
          src={tweef.user.image}
          alt="profile"
          className="w-8 rounded-full"
        />
        <p className="text-sm">{tweef.user.name}</p>
      </div>

      <div className="ml-8 flex justify-between">
        <p className="mt-2">{tweef.content}</p>
        <button
          onClick={() => handleLike(data?.user.id)}
          className={`text-sm flex items-center gap-2 cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className={`w-5 h-5 ${
              currentUserLiked ? 'fill-red-500 stroke-red-500' : ''
            } hover:scale-110 transition-all`}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>

          {tweef.like.length}
        </button>
      </div>
    </div>
  );
}

export default Tweef;
