import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Inquiry } from "@/lib/models/Inquiry";

export async function GET() {
  const sessionGuard = await requireAuth(["admin", "staff"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to list inquiries" }, { status: 500 });
  }
}
