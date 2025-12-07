// // import { NextResponse } from "next/server";
// // import prisma from "@/app/libs/prisma"; // your prisma client

// // export async function POST(req: Request) {
// //   try {
// //     const data = await req.json();

// //     const {
// //       customer,
// //       items,
// //       totalAmount,
// //       deliveryCharge,
// //       discountAmount,
// //       paymentMethod,
// //       notes,
// //       logisticInfo
// //     } = data;

// //     // 1. Create customer (or find existing by phone/email)
// //     const customerRecord = await prisma.customer.upsert({
// //       where: { phone: customer.phone },
// //       create: {
// //         fullName: customer.fullName,
// //         phone: customer.phone, 
// //         email: customer.email,
// //         city: customer.city,
// //         postalCode: customer.postalCode,
// //         address: customer.address,
// //       },
// //       update: {
// //         fullName: customer.fullName,
// //         city: customer.city,
// //         postalCode: customer.postalCode,
// //         address: customer.address,
// //       }
// //     });

// //     // 2. Create order
// //     const order = await prisma.order.create({
// //       data: {
// //         customerId: customerRecord.id,
// //         totalAmount,
// //         deliveryCharge,
// //         discountAmount,
// //         paymentMethod,
// //         notes: notes || null,
// //         logisticPartner: logisticInfo?.partner || null,
// //         trackingId: logisticInfo?.trackingId || null,
// //         partnerDeliveryCost: logisticInfo?.partnerDeliveryCost || null,

// //         items: {
// //           create: items.map((item: any) => ({
// //             productId: item.productId,
// //             quantity: item.quantity,
// //             price: item.price,
// //             discountedPrice: item.discountedPrice,
// //             totalPrice: item.totalPrice
// //           }))
// //         }
// //       },
// //       include: { items: true, customer: true }
// //     });

// //     return NextResponse.json({ success: true, order });
// //   } catch (error) {
// //     console.log(error);
// //     return NextResponse.json({ success: false, error: "Error creating order" }, { status: 500 });
// //   }
// // }


// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prisma";

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();

//     const {
//       customer,
//       items,
//       totalAmount,
//       deliveryCharge,
//       discountAmount,
//       paymentMethod,
//       notes,
//       logisticInfo
//     } = data;

//     if (!customer || !items || !totalAmount) {
//       return NextResponse.json({ success: false, error: "Missing required data" }, { status: 400 });
//     }

//     // 1. Upsert customer
//     const customerRecord = await prisma.customer.upsert({
//       where: { phone: customer.phone },
//       create: {
//         fullName: customer.fullName,
//         phone: customer.phone,
//         email: customer.email,
//         city: customer.city,
//         postalCode: customer.postalCode,
//         address: customer.address
//       },
//       update: {
//         fullName: customer.fullName,
//         city: customer.city,
//         postalCode: customer.postalCode,
//         address: customer.address
//       }
//     });

//     // 2. Create order
//     const order = await prisma.order.create({
//       data: {
//         customer: { connect: { id: customerRecord.id } },
//         subtotal: totalAmount - (discountAmount || 0),
//         productDiscount: discountAmount || 0,
//         deliveryFee: deliveryCharge || 0,
//         deliveryDiscount: 0, // adjust if needed
//         totalPayable: totalAmount,
//         paymentMethod,
//         paymentStatus: "pending",
//         status: "PENDING",
//         note: notes || null,
//         logisticPartner: logisticInfo?.partner || null,
//         trackingId: logisticInfo?.trackingId || null,
//         logisticPrice: logisticInfo?.partnerDeliveryCost || null,

//         items: {
//           create: items.map((item: any) => ({
//             productId: item.productId,
//             name: item.name,
//             price: item.price,
//             sellingPrice: item.discountedPrice || item.price,
//             qty: item.quantity,
//             image: item.image || null
//           }))
//         }
//       },
//       include: { items: true, customer: true }
//     });

//     return NextResponse.json({ success: true, order });
//   } catch (error) {
//     console.error("Checkout API error:", error);
//     return NextResponse.json({ success: false, error: "Error creating order" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

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

    // 1. Upsert customer
    const customerRecord = await prisma.customer.upsert({
      where: { phone: customer.phone },
      create: {
        fullName: customer.fullName,
        phone: customer.phone,
        email: customer.email,
        city: customer.city,
        postalCode: customer.postalCode,
        address: customer.address
      },
      update: {
        fullName: customer.fullName,
        city: customer.city,
        postalCode: customer.postalCode,
        address: customer.address
      }
    });

    // Calculate subtotal & productDiscount (adjust as needed)
    // const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const productDiscount = discountAmount || 0;
    const deliveryFee = deliveryCharge || 0;
    const totalPayable = totalAmount //|| subtotal - productDiscount + deliveryFee;
    // const deliveryDiscount = 0; // Adjust if you have delivery discounts

    // 2. Create order
    const order = await prisma.order.create({
      data: {
        customer: { connect: { id: customerRecord.id } },
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
        logisticPrice: logisticInfo?.partnerDeliveryCost || null,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            sellingPrice: item.sellingPrice || item.price,
            qty: item.qty,
            image: item.image || null
          }))
        }
      },
      include: {
        items: true,
        customer: true
      }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Error creating order" }, { status: 500 });
  }
}
