import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAuth } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongodb";
import { User } from "@/lib/models/User";

export async function GET() {
  const sessionGuard = await requireAuth(["admin"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    await connectToDatabase();
    const users = await User.find({}).sort({ createdAt: -1 }).select("-password").lean();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to list users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const sessionGuard = await requireAuth(["admin"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    const body = await request.json();
    await connectToDatabase();
    const passwordHash = await bcrypt.hash(body.password || "Admin@123456", 10);
    const user = await User.create({
      name: body.name,
      email: String(body.email).trim().toLowerCase(),
      password: passwordHash,
      role: body.role || "staff",
      isActive: body.isActive !== false,
    });

    return NextResponse.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create user" }, { status: 500 });
  }
}
