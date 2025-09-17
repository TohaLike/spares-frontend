import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies.get("refreshToken")?.value;

  if (pathname === "/") {
    if (cookie) {
      return NextResponse.redirect(new URL("/main", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/main")) {
    if (!cookie) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/main/:path*"],
};
