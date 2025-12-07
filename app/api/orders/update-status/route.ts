import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(req: Request) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status)
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });

    // Update order + push tracking history record
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        trackingHistory: {
          create: {
            status,
            date: new Date()
          }
        }
      }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Error updating status" }, { status: 500 });
  }
}
