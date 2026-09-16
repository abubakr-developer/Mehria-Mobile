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

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If attempting to promote to admin or change role to admin
    if (body.role === "admin" && existingUser.role !== "admin") {
      const otherAdmin = await User.findOne({ role: "admin", _id: { $ne: id } });
      if (otherAdmin) {
        return NextResponse.json(
          { error: "Only 1 administrator account is permitted in the system." },
          { status: 400 }
        );
      }
    }

    // If attempting to demote the only admin to staff
    if (existingUser.role === "admin" && body.role === "staff") {
      const otherAdmins = await User.countDocuments({ role: "admin", _id: { $ne: id } });
      if (otherAdmins === 0) {
        return NextResponse.json(
          { error: "Cannot change role. The system must maintain at least one active administrator." },
          { status: 400 }
        );
      }
    }

    const update: Record<string, unknown> = {};
    if (body.name !== undefined) update.name = String(body.name).trim();
    if (body.email !== undefined) update.email = String(body.email).trim().toLowerCase();
    if (body.role !== undefined) update.role = body.role;
    if (body.isActive !== undefined) update.isActive = Boolean(body.isActive);

    if (body.password) {
      update.password = await bcrypt.hash(body.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, update, { new: true });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, isActive: user.isActive },
    });
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

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (targetUser.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "Cannot delete the primary administrator account." },
          { status: 400 }
        );
      }
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete user" }, { status: 500 });
  }
}
