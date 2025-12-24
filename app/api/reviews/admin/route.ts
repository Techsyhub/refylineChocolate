// app/api/admin/reviews/route.ts
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: { files: true },
  });
  return NextResponse.json({ reviews });
}
