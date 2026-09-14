import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Inquiry } from "@/lib/models/Inquiry";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone = "", subject = "General Inquiry", message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const inquiry = await Inquiry.create({
      name,
      email: String(email).trim().toLowerCase(),
      phone: String(phone || ""),
      subject: String(subject || "General Inquiry"),
      message,
      status: "unread",
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiry: {
        id: inquiry._id,
        status: inquiry.status,
      },
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to submit inquiry",
      },
      { status: 500 }
    );
  }
}
