import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import {
  calculateLogisticPrice,
} from "@/app/libs/analytics";

const ORDER_START_FROM = 200000;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      customer,
      items,
      totalAmount,
      deliveryCharge,
      discountAmount,
      paymentMethod,
      notes,
      logisticInfo,
      subtotal,
      deliveryDiscount
    } = data;

    const productDiscount = discountAmount || 0;
    const deliveryFee = deliveryCharge || 0;
    const totalPayable = totalAmount;

    const logisticPrice = calculateLogisticPrice(items, customer.city);

    const order = await prisma.$transaction(async (tx) => {
      // 1️⃣ Upsert customer
      const customerRecord = await tx.customer.upsert({
        where: { phone: customer.phone },
        create: {
          fullName: customer.fullName,
          phone: customer.phone,
          email: customer.email,
          city: customer.city,
          postalCode: customer.postalCode,
          address: customer.address,
        },
        update: {
          fullName: customer.fullName,
          city: customer.city,
          postalCode: customer.postalCode,
          address: customer.address,
        },
      });

      // 2️⃣ Create order (ID generate hoga yahan)
      const createdOrder = await tx.order.create({
        data: {
          customerId: customerRecord.id,
          subtotal,
          productDiscount,
          deliveryFee,
          deliveryDiscount,
          totalPayable,
          paymentMethod,
          paymentStatus: "pending",
          status: "PENDING",
          note: notes || "",
          logisticPartner: logisticInfo?.partner || null,
          trackingId: logisticInfo?.trackingId || null,
          logisticPrice: logisticPrice || null,
          items: {
            create: items.map((item: any) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              sellingPrice: item.sellingPrice || item.price,
              qty: item.qty,
              image: item.image || null,
            })),
          },
        },
      });

      // 3️⃣ Generate Refyline order number
      const orderNumber = `REF-${createdOrder.id + ORDER_START_FROM}`;

      // 4️⃣ Update order with orderNumber
      return await tx.order.update({
        where: { id: createdOrder.id },
        data: { orderNumber },
        include: {
          items: true,
          customer: true,
        },
      });
    });

    return NextResponse.json({ success: true, order });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Error creating order" },
      { status: 500 }
    );
  }
}
