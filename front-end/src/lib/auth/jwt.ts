import { SignJWT, jwtVerify } from "jose";
import { UserRole } from "../models/User";

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
}

const JWT_SECRET_STRING =
  process.env.JWT_SECRET ||
  "mehria_mobiles_super_secure_fallback_jwt_key_2026_at_least_32_chars";

const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

export async function signToken(
  payload: TokenPayload,
  expiresIn = "7d"
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
}

export async function verifyToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as UserRole,
    };
  } catch {
    return null;
  }
}
