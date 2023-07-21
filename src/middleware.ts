import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const matcher = {
  config: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
