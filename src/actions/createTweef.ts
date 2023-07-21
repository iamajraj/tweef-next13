'use server';

import { prisma } from '../lib/prisma';

export const createTweef = async ({
  content,
  id,
}: {
  content: string;
  id: string;
}) => {
  await prisma.tweet.create({
    data: {
      userId: id,
      content: content,
    },
  });
};
