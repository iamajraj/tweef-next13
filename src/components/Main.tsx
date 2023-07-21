'use client';

import { useSession } from 'next-auth/react';
import React, { FormEvent, useEffect, useState } from 'react';
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
    <div className="w-1/2 p-4 flex flex-col">
      <h2 className="font-bold mb-4">Home</h2>
      <div className="flex gap-3 border-b border-gray-600 pb-4">
        <img
          src={session?.user.image ?? ''}
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
      <div className="mt-10 flex flex-col gap-4">
        {!isLoading ? (
          tweefs &&
          tweefs.map((tweef) => <Tweef tweef={tweef} refetch={refetch} />)
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Main;
