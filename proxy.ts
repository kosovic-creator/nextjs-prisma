import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";



// Public routes: prijava, register, home
const PUBLIC_PATHS = [
  "/",
  "/auth/prijava",
  "/auth/register"
];

export const proxy = withAuth(
  function (req: NextRequest) {
// If the route is public, allow
if (PUBLIC_PATHS.some((path) => req.nextUrl.pathname === path)) {
  return;
}
// The authorized callback below handles authorization and redirection.
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|api/auth|auth/prijava|auth/register).*)"
  ],
};