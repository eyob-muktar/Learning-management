import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isStudentRoute = createRouteMatcher(['/user/(.*)']);
const isTeacherRoute = createRouteMatcher(['/teacher/(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const userRole =
    (sessionClaims?.metadata as { userType: 'student' | 'teacher' })
      ?.userType || 'student';

  if (isStudentRoute(req)) {
    if (userRole !== 'student') {
      const url = new URL('/teacher/course', req.url);
      return NextResponse.redirect(url);
    }
  }

  if (isTeacherRoute(req)) {
    if (userRole !== 'teacher') {
      const url = new URL('/user/course', req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
