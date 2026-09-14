import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken, TokenPayload } from "./jwt";
import { UserRole } from "../models/User";

export const AUTH_COOKIE_NAME = "mehria_auth_token";

export async function getSession(): Promise<TokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export function setSessionCookie(token: string, response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export async function requireAuth(
  allowedRoles?: UserRole[]
): Promise<{ user: TokenPayload } | { error: string; status: number }> {
  const user = await getSession();

  if (!user) {
    return { error: "Authentication required", status: 401 };
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return { error: "Forbidden: insufficient permissions", status: 403 };
  }

  return { user };
}
