import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Order } from "@/lib/models/Order";
import { StoreSetting } from "@/lib/models/StoreSetting";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customer,
      items,
      deliveryFee = 0,
      paymentMethod = "COD",
    } = body;

    if (!customer?.name || !customer?.phone || !customer?.address || !customer?.city) {
      return NextResponse.json(
        { error: "Customer name, phone, address, and city are required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Order items are required" }, { status: 400 });
    }

    await connectToDatabase();

    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    const settings = await StoreSetting.findOne({}).lean();
    const fee = typeof deliveryFee === "number" ? deliveryFee : settings?.deliveryFee ?? 0;

    const orderNumber = `MM-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await Order.create({
      orderNumber,
      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        notes: customer.notes || "",
      },
      items: items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        img: item.img || "",
      })),
      subtotal,
      deliveryFee: fee,
      total: subtotal + fee,
      status: "pending",
      paymentMethod,
      paymentStatus: "pending",
    });

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderNumber,
      orderId: order._id,
    });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to submit order",
      },
      { status: 500 }
    );
  }
}
