import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const GET = async () => {
  try {
    const tweefs = await prisma.tweet.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
    return NextResponse.json(tweefs);
  } catch (err) {
    return NextResponse.json(
      { message: 'internal error' },
      {
        status: 500,
      }
    );
  }
};
