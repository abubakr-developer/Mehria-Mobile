import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAuth } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongodb";
import { User } from "@/lib/models/User";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionGuard = await requireAuth(["admin"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();

    const update: Record<string, unknown> = {
      name: body.name,
      email: String(body.email || "").trim().toLowerCase(),
      role: body.role,
      isActive: body.isActive,
    };

    if (body.password) {
      update.password = await bcrypt.hash(body.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, update, { new: true });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update user" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionGuard = await requireAuth(["admin"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    const { id } = await params;
    await connectToDatabase();
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete user" }, { status: 500 });
  }
}
