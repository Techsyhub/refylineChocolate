import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.rating)
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });

    const review = await prisma.review.create({
      data: data
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Error adding review" }, { status: 500 });
  }
}
