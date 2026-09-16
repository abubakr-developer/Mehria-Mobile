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
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const email = String(body.email).trim().toLowerCase();
    const role = body.role === "admin" ? "admin" : "staff";

    await connectToDatabase();

    if (role === "admin") {
      const existingAdmin = await User.findOne({ role: "admin" });
      if (existingAdmin) {
        return NextResponse.json(
          { error: "Only 1 administrator account is allowed. Create a staff account instead." },
          { status: 400 }
        );
      }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await User.create({
      name: body.name.trim(),
      email,
      password: passwordHash,
      role,
      isActive: body.isActive !== false,
    });

    return NextResponse.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, isActive: user.isActive },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create user" }, { status: 500 });
  }
}
