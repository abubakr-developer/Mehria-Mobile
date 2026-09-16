import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Inquiry } from "@/lib/models/Inquiry";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionGuard = await requireAuth(["admin", "staff"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();
    const inquiry = await Inquiry.findByIdAndUpdate(id, { status: body.status || "read" }, { new: true, runValidators: true });
    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionGuard = await requireAuth(["admin", "staff"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    const { id } = await params;
    await connectToDatabase();
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete inquiry" }, { status: 500 });
  }
}
