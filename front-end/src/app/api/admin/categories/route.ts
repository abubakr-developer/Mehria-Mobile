import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Category } from "@/lib/models/Category";

export async function GET() {
  const sessionGuard = await requireAuth(["admin", "staff"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    await connectToDatabase();
    const categories = await Category.find({}).sort({ displayOrder: 1 }).lean();
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to list categories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const sessionGuard = await requireAuth(["admin", "staff"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    const body = await request.json();
    await connectToDatabase();
    const category = await Category.create({
      id: body.id || String(Date.now()),
      label: body.label,
      description: body.description || "",
      displayOrder: Number(body.displayOrder || 0),
    });
    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create category" }, { status: 500 });
  }
}
