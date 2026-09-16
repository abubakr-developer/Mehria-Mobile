import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongodb";
import { StoreSetting } from "@/lib/models/StoreSetting";

export async function GET() {
  const sessionGuard = await requireAuth(["admin"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    await connectToDatabase();
    const setting = await StoreSetting.findOne({}).lean();
    return NextResponse.json({ success: true, settings: setting || {} });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const sessionGuard = await requireAuth(["admin"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    const body = await request.json();
    await connectToDatabase();
    const setting = await StoreSetting.findOneAndUpdate({}, body, { new: true, upsert: true, runValidators: true });
    return NextResponse.json({ success: true, settings: setting });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update settings" }, { status: 500 });
  }
}
