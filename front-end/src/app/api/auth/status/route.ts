import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { User } from "@/lib/models/User";
import { seedDatabaseIfNeeded } from "@/lib/db/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    await seedDatabaseIfNeeded();

    const adminCount = await User.countDocuments({ role: "admin" });
    return NextResponse.json({
      hasAdmin: adminCount > 0,
      adminCount,
    });
  } catch (error: unknown) {
    console.error("Auth status error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to retrieve status",
      },
      { status: 500 }
    );
  }
}
