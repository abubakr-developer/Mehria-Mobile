import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Order } from "@/lib/models/Order";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionGuard = await requireAuth(["admin", "staff"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();
    const order = await Order.findByIdAndUpdate(id, { status: body.status }, { new: true, runValidators: true });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update order" }, { status: 500 });
  }
}
