import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth/jwt";

export const AUTH_COOKIE_NAME = "mehria_auth_token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow login page without token
  if (pathname === "/admin/login") {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (token) {
      const payload = await verifyToken(token);
      if (payload && (payload.role === "admin" || payload.role === "staff")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
    return NextResponse.next();
  }

  // 2. Check protected Admin routes & Admin API
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (isAdminPage || isAdminApi) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      if (isAdminApi) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyToken(token);

    if (!payload || !payload.role) {
      if (isAdminApi) {
        return NextResponse.json(
          { error: "Invalid or expired session" },
          { status: 401 }
        );
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("error", "session_expired");
      return NextResponse.redirect(loginUrl);
    }

    // Role-based restrictions: Only 'admin' can access /admin/users or /api/admin/users
    if (
      (pathname.startsWith("/admin/users") ||
        pathname.startsWith("/api/admin/users")) &&
      payload.role !== "admin"
    ) {
      if (isAdminApi) {
        return NextResponse.json(
          { error: "Forbidden: Admin access required" },
          { status: 403 }
        );
      }
      return NextResponse.redirect(
        new URL("/admin?error=forbidden", request.url)
      );
    }

    // Add user info to request headers for downstream routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-email", payload.email);
    requestHeaders.set("x-user-role", payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
