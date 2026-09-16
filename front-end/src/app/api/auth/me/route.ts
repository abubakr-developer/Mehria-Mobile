import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongodb";
import { User } from "@/lib/models/User";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    try {
      await connectToDatabase();
      const user = await User.findById(session.userId).select("-password");

      if (!user || !user.isActive) {
        return NextResponse.json(
          { error: "User not found or deactivated" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch {
      // If DB error, fallback to session data
      return NextResponse.json({
        user: {
          id: session.userId,
          name: session.name,
          email: session.email,
          role: session.role,
        },
      });
    }
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error fetching session",
      },
      { status: 500 }
    );
  }
}
