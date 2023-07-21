import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV !== 'production') {
  (globalThis as any).prisma = (globalThis as any).prisma
    ? (globalThis as any).prisma
    : new PrismaClient();
  prisma = (globalThis as any).prisma;
} else {
  prisma = new PrismaClient();
}

export { prisma };
