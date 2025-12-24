// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prisma";

// export async function POST(req: Request) {
//   try {
//     const { orderId, status, trackingId, logisticPartner } = await req.json();

//     if (!orderId)
//       return NextResponse.json(
//         { success: false, message: "Order ID missing" },
//         { status: 400 }
//       );

//     const order = await prisma.order.update({
//       where: { id: orderId },
//       data: {
//         status,
//         trackingId,
//         logisticPartner,
//         trackingHistory: status
//           ? {
//               create: {
//                 status,
//                 date: new Date(),
//               },
//             }
//           : undefined, // add history only if status changed
//       },
//     });

//     return NextResponse.json({ success: true, order });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { success: false, message: "Error updating order" },
//       { status: 500 }
//     );
//   }
// }


// app/api/admin/orders/update/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, status, trackingId, logisticPartner, logisticPrice } = body;

    if (!orderId) return NextResponse.json({ success: false, error: "orderId required" }, { status: 400 });

    const dataToUpdate: any = {};
    if (status) dataToUpdate.status = status;
    if (trackingId !== undefined) dataToUpdate.trackingId = trackingId;
    if (logisticPartner !== undefined) dataToUpdate.logisticPartner = logisticPartner;
    if (logisticPrice !== undefined) dataToUpdate.logisticPrice = logisticPrice;

    // update order and create status history entry when status changes
    const orderBefore = await prisma.order.findUnique({ where: { id: orderId } });

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        ...dataToUpdate,
        statusTimeline: {
          create: status ? { status, note: `Updated via admin UI` } : undefined,
        },
      },
      include: { customer: true, items: true },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}
