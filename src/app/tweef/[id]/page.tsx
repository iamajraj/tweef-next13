'use client';

import React from 'react';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { getTweef } from '../../../queries';
import Tweef from '../../../components/Tweef';
import Spinner from '../../../components/Spinner';

type Props = {
  params: { id: string };
};

function SingleTweef({ params }: Props) {
  const router = useRouter();

  const {
    isLoading,
    data: tweef,
    refetch,
  } = useQuery<TweefT>({
    queryKey: 'getSingleTweef',
    queryFn: getTweef(params.id),
    useErrorBoundary(error, query) {
      return (error as any).response?.status >= 500;
    },
  });

  return (
    <Layout>
      <div className="flex-1">
        <div className="flex items-center gap-4 px-4 py-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4 cursor-pointer"
            onClick={() => router.back()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <p className="text-lg font-semibold">Tweefs</p>
        </div>
        {!isLoading ? (
          tweef ? (
            <Tweef tweef={tweef} refetch={refetch} />
          ) : (
            <p className="text-center">Tweef doesn't exist</p>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </Layout>
  );
}

export default SingleTweef;
