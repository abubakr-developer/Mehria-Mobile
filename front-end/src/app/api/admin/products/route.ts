import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/lib/models/Product";

export async function GET() {
  const sessionGuard = await requireAuth(["admin", "staff"]);
  if ("error" in sessionGuard) {
    return NextResponse.json({ error: sessionGuard.error }, { status: sessionGuard.status });
  }

  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to list products" }, { status: 500 });
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

    const product = await Product.create({
      id: Date.now(),
      name: body.name,
      price: Number(body.price),
      oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
      tag: body.tag || null,
      tagColor: body.tagColor || "#00C2D1",
      tagText: body.tagText || "#3C3837",
      category: body.category,
      rating: Number(body.rating || 5),
      reviews: Number(body.reviews || 0),
      img: body.img || "/imagegs/products/1.jfif",
      description: body.description || "",
      inStock: body.inStock !== false,
      featured: Boolean(body.featured),
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create product" }, { status: 500 });
  }
}
