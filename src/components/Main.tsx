'use client';

import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react';
import { createTweef } from '../actions/createTweef';
import Tweef from './Tweef';
import { useQuery } from 'react-query';
import { getTweefs } from '../queries';
import Spinner from './Spinner';

type Props = {};

function Main({}: Props) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');

  const {
    isLoading,
    data: tweefs,
    refetch,
  } = useQuery<TweefT[]>({
    queryKey: 'getAllTweefs',
    queryFn: getTweefs,
    useErrorBoundary(error, query) {
      return (error as any).response?.status >= 500;
    },
  });

  const postIt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;

    await createTweef({
      content,
      id: session!.user.id,
    });

    setContent('');
    await refetch();
  };

  return (
    <div className="w-1/2 py-4 flex flex-col">
      <h2 className="font-bold pb-6 px-4 border-b border-b-gray-800">Home</h2>
      <div className="flex gap-3 border-b border-gray-800 pb-4 px-4 mt-5">
        <img
          src={session?.user.image ?? undefined}
          alt="logo"
          className="w-10 h-10 rounded-full shrink-0"
        />
        <form onSubmit={postIt} className="flex flex-col flex-1 mt-2">
          <input
            type="text"
            placeholder="What's on your mind?"
            className="bg-transparent border-none outline-none "
            value={content}
            onChange={(t) => setContent(t.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 rounded-full py-2 w-max px-7 ml-auto"
          >
            Tweef
          </button>
        </form>
      </div>
      <div className="mt-5 flex flex-col gap-4  overflow-y-scroll no-scrollbar">
        {!isLoading ? (
          Array.isArray(tweefs) ? (
            tweefs.map((tweef) => (
              <Tweef key={tweef.id} tweef={tweef} refetch={refetch} />
            ))
          ) : (
            <p className="text-center">Internal server error</p>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Main;
