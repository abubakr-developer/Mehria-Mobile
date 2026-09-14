import { NextResponse } from "next/server";
import { getSession, requireAuth } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Order } from "@/lib/models/Order";
import { Inquiry } from "@/lib/models/Inquiry";
import { Product } from "@/lib/models/Product";

export async function GET() {
  const sessionGuard = await requireAuth(["admin", "staff"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    await connectToDatabase();

    const [orders, inquiries, lowStockProducts, productCount] = await Promise.all([
      Order.find({}).sort({ createdAt: -1 }).lean(),
      Inquiry.find({}).sort({ createdAt: -1 }).lean(),
      Product.find({ inStock: false }).limit(10).lean(),
      Product.countDocuments(),
    ]);

    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
    const unreadInquiries = inquiries.filter((item) => item.status === "unread").length;

    return NextResponse.json({
      success: true,
      dashboard: {
        metrics: {
          revenue: totalRevenue,
          orders: orders.length,
          lowStock: lowStockProducts.length,
          unreadInquiries,
        },
        orders: orders.slice(0, 6),
        inquiries: inquiries.slice(0, 5),
        productCount,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load dashboard" },
      { status: 500 }
    );
  }
}
