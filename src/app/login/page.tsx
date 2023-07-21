'use client';

import React, { useEffect, useState } from 'react';
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

import { Luckiest_Guy } from 'next/font/google';
import { cn } from '../../lib/utils';

type Props = {};

const font = Luckiest_Guy({
  weight: '400',
  subsets: ['latin'],
});

function Login({}: Props) {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  const setAuthProviders = async () => {
    const provs = await getProviders();
    setProviders(provs);
  };

  useEffect(() => {
    setAuthProviders();
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="image-edge-blue w-1/2 bg-[url(https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000)] bg-cover bg-center p-10 flex flex-col justify-center gap-5 text-black">
        <h1 className={cn('text-6xl font-bold', font.className)}>
          Join the powerful community for arguing
        </h1>
        <p className="italic">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Reprehenderit beatae dicta iste deleniti! Est provident quis, tempore
          officia minus autem!
        </p>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              onClick={() => {
                signIn(provider.id, {
                  callbackUrl: '/',
                  redirect: true,
                });
              }}
              className="border px-10 py-2 rounded-full shadow-md flex items-center gap-4 hover:shadow-lg transition-all bg-white text-black"
            >
              <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
                alt="google"
                className="w-8"
              />
              <p>Sign in with {provider.name}</p>
            </button>
          ))}
      </div>
    </div>
  );
}

export default Login;
