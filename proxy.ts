import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/utils/env";

const PROTECTED_PATHS: string[] = [];

/*
 * Token format expected from the client-side cookie.
 */
interface TokenPayload extends JwtPayload {
  _id: string;
  email: string;
  username: string;
}

/*
 * Add x-user-id header when accessing protected path.
 * User will be redirected to login page if their token is invalid.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Proceed if the path is not protected
  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname.startsWith(path)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Check for token
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect("/login");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET!) as TokenPayload;

    // Attach user ID so it becomes available to route handlers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded._id);

    return NextResponse.next({ request: { headers: requestHeaders }});
  } catch (error) {
    // Invalid token
    return NextResponse.redirect("/login");
  }
}
