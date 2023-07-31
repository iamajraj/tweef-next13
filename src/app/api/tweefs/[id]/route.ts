import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export const GET = async (
  _: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const tweef = await prisma.tweet.findFirst({
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(tweef);
  } catch (err) {
    return NextResponse.json(
      { message: 'internal error' },
      {
        status: 500,
      }
    );
  }
};
