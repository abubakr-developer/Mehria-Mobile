import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/lib/models/Product";
import { products as fallbackProducts } from "@/app/data/products";
import { seedDatabaseIfNeeded } from "@/lib/db/seed";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "popular";
  const limit = Number(searchParams.get("limit")) || 0;

  try {
    await connectToDatabase();
    await seedDatabaseIfNeeded();

    // Build MongoDB query filter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (category && category !== "all") {
      query.category = category;
    }
    if (search && search.trim()) {
      query.name = { $regex: search.trim(), $options: "i" };
    }

    // Build sort
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sortObj: any = { reviews: -1 };
    if (sort === "price-asc") sortObj = { price: 1 };
    else if (sort === "price-desc") sortObj = { price: -1 };
    else if (sort === "rating") sortObj = { rating: -1 };
    else if (sort === "newest") sortObj = { createdAt: -1 };

    let q = Product.find(query).sort(sortObj);
    if (limit > 0) {
      q = q.limit(limit);
    }

    const products = await q.lean();

    if (products && products.length > 0) {
      return NextResponse.json({ success: true, products });
    }
  } catch (error) {
    console.warn("MongoDB fetch failed, using fallback products catalog:", error);
  }

  // Graceful fallback to static data
  let list = [...fallbackProducts];
  if (category && category !== "all") {
    list = list.filter((p) => p.category === category);
  }
  if (search && search.trim()) {
    const term = search.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(term));
  }
  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
  else list.sort((a, b) => b.reviews - a.reviews);

  if (limit > 0) {
    list = list.slice(0, limit);
  }

  return NextResponse.json({ success: true, products: list, isFallback: true });
}
