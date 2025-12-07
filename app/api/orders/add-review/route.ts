import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(req: Request) {
  try {
    const { orderId, rating, comment } = await req.json();

    if (!orderId || !rating)
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });

    const review = await prisma.review.create({
      data: {
        orderId,
        rating,
        comment: comment || null
      }
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Error adding review" }, { status: 500 });
  }
}
