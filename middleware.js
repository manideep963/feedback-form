import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Public path (like signin, signup)
  if (pathname.startsWith("/signin") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // If no session token → redirect to signin
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Admin-only routes (like /admin or /feedback)
  if (pathname.startsWith("/admin") || pathname.startsWith("/feedback")) {
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Users can post feedback (e.g., /dashboard)
  if (pathname.startsWith("/dashboard") && token.role !== "user" && token.role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
