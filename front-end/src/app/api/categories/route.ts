import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Category } from "@/lib/models/Category";
import { categories as fallbackCategories } from "@/app/data/products";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}).sort({ displayOrder: 1 }).lean();

    if (categories.length > 0) {
      return NextResponse.json({
        success: true,
        categories: categories.map((category) => ({
          id: category.id,
          label: category.label,
          description: category.description,
          displayOrder: category.displayOrder,
        })),
      });
    }
  } catch (error) {
    console.warn("MongoDB category lookup failed, using fallback categories:", error);
  }

  return NextResponse.json({
    success: true,
    categories: fallbackCategories.map((category) => ({
      id: category.id,
      label: category.label,
    })),
    isFallback: true,
  });
}
