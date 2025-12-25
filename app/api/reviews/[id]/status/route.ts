// app/api/admin/reviews/[id]/status/route.ts
import prisma from "@/app/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string; }>; } // ✅ must be plain object
) {
  
  const {id} = await context.params;
  const reviewId =  Number(id);
  const data = await req.json();
  const { status } = data;

  if (!["APPROVED","REJECTED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = await prisma.review.update({
    where: { id: reviewId },
    data: { status },
    include: { files: true },
  });

  return NextResponse.json({ success: true, review: updated });
}
