import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/lib/models/Product";
import { products as fallbackProducts } from "@/app/data/products";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);

  try {
    await connectToDatabase();
    // Search by numeric id or Mongo _id
    const product = isNaN(numId)
      ? await Product.findById(id).lean()
      : await Product.findOne({ id: numId }).lean();

    if (product) {
      return NextResponse.json({ success: true, product });
    }
  } catch {
    // If DB fails, fallback
  }

  const fallback = fallbackProducts.find((p) => p.id === numId);
  if (fallback) {
    return NextResponse.json({ success: true, product: fallback, isFallback: true });
  }

  return NextResponse.json({ error: "Product not found" }, { status: 404 });
}
