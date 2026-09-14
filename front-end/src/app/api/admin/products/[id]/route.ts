import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/lib/models/Product";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionGuard = await requireAuth(["admin", "staff"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    const { id } = await params;
    await connectToDatabase();
    const product = await Product.findById(id).lean();
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load product" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionGuard = await requireAuth(["admin", "staff"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();
    const product = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update product" }, { status: 500 });
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
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete product" }, { status: 500 });
  }
}
