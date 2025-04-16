import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/sign-in",
    "/auth/sign-up",
    "/",
    "/auth/verify-otp/:path*",
  ],
};

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith("/auth/sign-in") ||
      url.pathname.startsWith("/auth/sign-up") ||
      url.pathname.startsWith("/auth/verify") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}
