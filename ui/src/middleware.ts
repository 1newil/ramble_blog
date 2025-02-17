import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isEditorEnabled = process.env.NEXT_PUBLIC_MODE === "ADMIN";
  if (!isEditorEnabled) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to homepage
  }

  return NextResponse.next();
}

// Apply middleware only to /markdownEditor route
export const config = {
  matcher: "/markdownEditor/:path*",
};
