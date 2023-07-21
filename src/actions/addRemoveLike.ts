'use server';

import { prisma } from '../lib/prisma';

export const addRemoveLike = async ({
  tweefId,
  userId,
}: {
  tweefId: string;
  userId: string;
}) => {
  try {
    const tweef = await prisma.tweet.findFirst({
      where: {
        id: tweefId,
      },
    });

    if (tweef?.like.includes(userId)) {
      await prisma.tweet.update({
        data: {
          like: tweef!.like.filter((l) => l != userId),
        },
        where: {
          id: tweefId,
        },
      });
    } else {
      await prisma.tweet.update({
        data: {
          like: [...tweef!.like, userId],
        },
        where: {
          id: tweefId,
        },
      });
    }
  } catch (err) {}
};
