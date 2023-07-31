'use client';

import { useSession } from 'next-auth/react';
import React, { useMemo } from 'react';
import { addRemoveLike } from '../actions/addRemoveLike';
import moment from 'moment';
import Link from 'next/link';

type Props = { tweef: TweefT; refetch: () => void };

function Tweef({ tweef, refetch }: Props) {
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
    <div className="flex flex-col border-b border-gray-800 pb-5 px-4">
      <div className="flex items-start gap-2">
        <img
          src={tweef.user.image}
          alt="profile"
          className="w-8 rounded-full"
          referrerPolicy="no-referrer"
        />
        <div className="flex items-center gap-2">
          <p className="text-[15px] font-medium">{tweef.user.name}</p>
          <p className="text-[13px] text-gray-400">
            @{tweef.user.name.toLowerCase().split(' ').join('')}
          </p>
          <span className="text-[12px] text-gray-400">
            {' '}
            · {moment(tweef.createdAt).fromNow()}
          </span>
        </div>
      </div>

      <div className="ml-10 w-full">
        <Link href={`/tweef/${tweef.id}`}>
          <p>{tweef.content}</p>
        </Link>
      </div>
      <div className="ml-10 flex items-center gap-3 mt-3 pt-3">
        <button
          onClick={() => handleLike(data?.user.id)}
          className={`text-sm flex items-center gap-2 cursor-pointer text-gray-400`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
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
        </button>{' '}
        <button
          onClick={() => handleLike(data?.user.id)}
          className={`text-sm flex items-center gap-2 cursor-pointer text-gray-400`}
        >
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
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>

          {tweef.comments.length}
        </button>
      </div>
    </div>
  );
}

export default Tweef;
