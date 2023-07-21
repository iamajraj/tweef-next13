'use client';

import { useSession } from 'next-auth/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { createTweef } from '../actions/createTweef';
import Tweef from './Tweef';

type Props = {};

function Main({}: Props) {
  const { data: session } = useSession();
  const [tweefs, setTweefs] = useState<TweefT[] | null>(null);
  const [content, setContent] = useState('');

  const getTweefs = async () => {
    try {
      const res = await fetch('/api/tweefs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setTweefs(data);
    } catch (err) {}
  };

  useEffect(() => {
    getTweefs();
  }, []);

  const postIt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;

    await createTweef({
      content,
      id: session!.user.id,
    });

    setContent('');
    await getTweefs();
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
        {tweefs &&
          tweefs.map((tweef) => <Tweef tweef={tweef} refetch={getTweefs} />)}
      </div>
    </div>
  );
}

export default Main;
