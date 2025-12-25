// // server side: returns PDF blob or HTML that browser can print
// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prisma";
// import html2pdf from "html-pdf-node"; // optional (install if you want server pdf generation)

// export async function GET(req: Request, { params }: any) {
//   try {
//     const id = Number(params.id);
//     const order = await prisma.order.findUnique({ where: { id }, include: { customer: true, items: true } });
//     if (!order) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

//     // For simplicity return JSON and let client create PDF. Implement server PDF with library if needed.
//     return NextResponse.json({ success: true, order });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prisma";
// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// export default async function Page({ params }) {
//   const order = await prisma.order.findUnique({
//     where: { id: params.orderId },
//     include: { customer: true, items: true },
//   });

//   const pdf = await PDFDocument.create();
//   const page = pdf.addPage([600, 900]);
//   const font = await pdf.embedFont(StandardFonts.Helvetica);

//   if (!order){
//     return NextResponse.json({message:"no order found"})
//   }
//   page.drawText("Tracking Number: " + order.trackingId, { x: 40, y: 850, size: 14, font });

//   page.drawRectangle({ x: 40, y: 780, width: 520, height: 60, borderWidth: 1 });

//   page.drawText("Daraz", { x: 50, y: 820, size: 18, font, color: rgb(0, 0, 0) });
//   page.drawText("COD: " + order.totalPayable, { x: 400, y: 820, size: 14, font });

//   page.drawText("Recipient: " + order.customer.fullName, { x: 50, y: 760, size: 12, font });
//   page.drawText("Phone: " + order.customer.phone, { x: 50, y: 740, size: 12, font });
//   page.drawText("Address: " + order.customer.address, { x: 50, y: 720, size: 12, font });

//   const pdfBytes = await pdf.save();

//   return new Response(pdfBytes, {
//     headers: {
//       "Content-Type": "application/pdf",
//     },
//   });
// }


// export const runtime = "nodejs";

// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prisma";
// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// export async function GET(req: Request, { params }: { params: { id: string } }) {

//     let {id}= await params;
    
//   const order = await prisma.order.findUnique({
//     where: { id: Number(id) },
//     include: { customer: true, items: true },
//   });

//   if (!order) {
//     return NextResponse.json({ message: "No order found" }, { status: 404 });
//   }

//   const pdf = await PDFDocument.create();
//   const page = pdf.addPage([600, 900]);
//   const font = await pdf.embedFont(StandardFonts.Helvetica);

//   page.drawText("Tracking Number: " + order.trackingId, {
//     x: 40,
//     y: 850,
//     size: 14,
//     font,
//   });

//   page.drawRectangle({ x: 40, y: 780, width: 520, height: 60, borderWidth: 1 });

//   page.drawText("Daraz", { x: 50, y: 820, size: 18, font });
//   page.drawText("COD: " + order.totalPayable, { x: 400, y: 820, size: 14, font });

//   page.drawText("Recipient: " + order.customer.fullName, {
//     x: 50,
//     y: 760,
//     size: 12,
//     font,
//   });
//   page.drawText("Phone: " + order.customer.phone, {
//     x: 50,
//     y: 740,
//     size: 12,
//     font,
//   });
//   page.drawText("Address: " + order.customer.address, {
//     x: 50,
//     y: 720,
//     size: 12,
//     font,
//   });

//   const pdfBytes = await pdf.save();

//   return new Response(pdfBytes, {
//     headers: {
//       "Content-Type": "application/pdf",
//       "Content-Disposition": "inline; filename=receipt.pdf",
//     },
//   });
// }


// export const runtime = "nodejs";

// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prisma";
// import { PDFDocument, StandardFonts } from "pdf-lib";
// import { DUO_BUNDLE, TRIO_BUNDLE } from "@/app/constants/product";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const {id} = await params;

//   const orderId= Number(id);

//   if (isNaN(orderId)) {
//     return NextResponse.json(
//       { message: "Invalid order id" },
//       { status: 400 }
//     );
//   }

//   // ---- Fetch Order ----
//   const order = await prisma.order.findUnique({
//     where: { id: orderId },
//     include: {
//       items: true,                // fetch order items
//     },
//   });

//   if (!order) {
//     return NextResponse.json(
//       { message: "Order not found" },
//       { status: 404 }
//     );
//   }

//   // ---- Fetch Customer Using customerId ----
//   const customer = await prisma.customer.findUnique({
//     where: { id: order.customerId },
//   });

//   if (!customer) {
//     return NextResponse.json(
//       { message: "Customer not found" },
//       { status: 404 }
//     );
//   }

//   // Date + Time
//   const date = order.createdAt.toLocaleDateString();
//   const time = order.createdAt.toLocaleTimeString();

//   const deliveryPartnerName =
//     order.logisticPartner || "Not Assigned";

//   // ---- Create PDF ----
//   const pdf = await PDFDocument.create();
//   const page = pdf.addPage([600, 900]);
//   const font = await pdf.embedFont(StandardFonts.Helvetica);

//   let y = 850;

//   page.drawText("Order Receipt", { x: 40, y, size: 20, font });
//   y -= 40;

//   // Order Meta
//   page.drawText(`Date: ${date}`, { x: 40, y, size: 12, font });
//   y -= 20;
//   page.drawText(`Time: ${time}`, { x: 40, y, size: 12, font });
//   y -= 20;
//   page.drawText(`Delivery Partner: ${deliveryPartnerName}`, {
//     x: 40,
//     y,
//     size: 12,
//     font,
//   });
//   y -= 40;

//   // Customer Info
//   page.drawText(`Customer Information`, { x: 40, y, size: 14, font });
//   y -= 25;

//   page.drawText(`Name: ${customer.fullName}`, { x: 40, y, size: 12, font });
//   y -= 20;

//   page.drawText(`Email: ${customer.email || "N/A"}`, {
//     x: 40,
//     y,
//     size: 12,
//     font,
//   });
//   y -= 20;

//   page.drawText(`Phone: ${customer.phone}`, { x: 40, y, size: 12, font });
//   y -= 20;

//   page.drawText(`Address: ${customer.address}`, {
//     x: 40,
//     y,
//     size: 12,
//     font,
//   });
//   y -= 20;
 
//   page.drawText(`Note: ${order.note || "No notes"}`, {
//     x: 40,
//     y,
//     size: 12,
//     font,
//   });
//   y -= 40;

//   // Order Details
//   page.drawText(`Order Details`, { x: 40, y, size: 14, font });
//   y -= 25;
// let totalQty=0
//   order.items.forEach((item) => {
//    totalQty= totalQty + ( item.name === DUO_BUNDLE? item.qty *2 :item.name === TRIO_BUNDLE? item.qty * 3 : item.qty )
//     page.drawText(
//       `• ${item.name} (Qty: ${item.name === DUO_BUNDLE? `(${item.qty} bundle x 2 = ${item.qty*2} pieces)`: item.name === TRIO_BUNDLE ? `(${item.qty} x 3 = ${item.qty*3})`:
      
//        item.qty})`,
//       {
//         x: 60,
//         y,
//         size: 12,
//         font,
//       }
//     );
//     y -= 20;
//   });

// //   const totalQty = order.items.reduce(
// //     (sum, item) => sum + item.qty,
// //     0
// //   );

//   y -= 10;
//   page.drawText(`Total Quantity: ${totalQty} Pieces`, {
//     x: 40,
//     y,
//     size: 12,
//     font,
//   });
//   y -= 20;

//   page.drawText(`Total Weight = ${totalQty * 250/1000} Kg`, {
//     x: 40,
//     y,
//     size: 12,
//     font,
//   });
// y -= 40;

//   // Payment
//   page.drawText(
//     `Payment Method: ${order.paymentMethod || "N/A"}`,
//     { x: 40, y, size: 14, font }
//   );
//   y -= 20;

// //   page.drawText(
// //     `Payment Status: ${order.paymentStatus || "N/A"}`,
// //     { x: 40, y, size: 12, font }
// //   );
// //   y -= 40;

//   page.drawText("Thank you for ordering!", {
//     x: 40,
//     y,
//     size: 12,
//     font,
//   });

//   const pdfBytes = await pdf.save();

//   return new Response(pdfBytes, {
//     headers: {
//       "Content-Type": "application/pdf",
//       "Content-Disposition": "inline; filename=receipt.pdf",
//     },
//   });
// }



export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { DUO_BUNDLE, TRIO_BUNDLE } from "@/app/constants/main";

function getParams<T>(params: T): Promise<T> {
  return Promise.resolve(params);
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await getParams(params);
  //  const id = params.id; 
  const orderId = Number(id);

  if (isNaN(orderId)) {
    return NextResponse.json({ message: "Invalid order id" }, { status: 400 });
  }

  // Fetch order and items
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

  // Fetch customer
  const customer = await prisma.customer.findUnique({ where: { id: order.customerId } });
  if (!customer) return NextResponse.json({ message: "Customer not found" }, { status: 404 });

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([900, 600]); // Horizontal page
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

  let y = 550;
  const margin = 40;

  // ---- Company Header ----
  page.drawText("Refyline", { x: margin, y, size: 22, font: boldFont, color: rgb(0, 0, 0) });
  page.drawText("Website: refyline.com", { x: margin, y: y - 25, size: 12, font });
  page.drawText(`Parcel Slip`, { x: 700, y, size: 16, font: boldFont });
  y -= 50;

  // ---- Order Info ----
  page.drawText(`Tracking Number: ${order.trackingId || "N/A"}`, { x: margin, y, size: 12, font });
  page.drawText(`Date: ${order.createdAt.toLocaleDateString()}`, { x: 300, y, size: 12, font });
  page.drawText(`Time: ${order.createdAt.toLocaleTimeString()}`, { x: 450, y, size: 12, font });
  page.drawText(`Delivery Partner: ${order.logisticPartner || "Not Assigned"}`, { x: 600, y, size: 12, font });
  y -= 30;

  // ---- Customer Info ----
  page.drawText("Customer Information", { x: margin, y, size: 14, font: boldFont });
  y -= 20;
  page.drawText(`Name: ${customer.fullName}`, { x: margin, y, size: 12, font });
  page.drawText(`Email: ${customer.email || "N/A"}`, { x: 300, y, size: 12, font });
  y -= 20;
  page.drawText(`Phone: ${customer.phone}`, { x: margin, y, size: 12, font });
  page.drawText(`Address: ${customer.address}`, { x: 300, y, size: 12, font });
  y -= 20;
  page.drawText(`Note: ${order.note || "No notes"}`, { x: margin, y, size: 12, font });
  y -= 40;

  // ---- Table Header ----
  const tableX = margin;
  const tableY = y;
  const colWidths = [300, 100, 100, 100];
  const rowHeight = 25;

  const tableHeaders = ["Product Name", "Quantity", "Price", "Total"];
  let currentX = tableX;
  for (let i = 0; i < tableHeaders.length; i++) {
    page.drawRectangle({ x: currentX, y: tableY, width: colWidths[i], height: rowHeight, borderColor: rgb(0,0,0), borderWidth: 1 });
    page.drawText(tableHeaders[i], { x: currentX + 5, y: tableY + 7, size: 12, font: boldFont });
    currentX += colWidths[i];
  }

  y = tableY - rowHeight;

  let totalQty = 0;
  let totalAmount = 0;

  // ---- Table Rows ----
  order.items.forEach((item) => {
    const itemQty =
      item.name === DUO_BUNDLE ? item.qty * 2 :
      item.name === TRIO_BUNDLE ? item.qty * 3 :
      item.qty;
    totalQty += itemQty;
    const itemTotal = item.price * item.qty;
    totalAmount += itemTotal;

    currentX = tableX;

    // const rowData = [
    //   item.name === DUO_BUNDLE? 
    //     `${item.name} (Bundle of 2 Chocolate Boxes)`:
    //     item.name === TRIO_BUNDLE? `${item.name} (Bundle of 3 Chocolate Boxes)`: 
    //     item.name ,
    //   `${itemQty}`,
    //   `${item.price}`,
    //   `${itemTotal}`,
    // ];

    const rowData = [
  item.name === DUO_BUNDLE
    ? `${item.name} (Bundle of 2 Chocolate Boxes)`
    : item.name === TRIO_BUNDLE
    ? `${item.name} (Bundle of 3 Chocolate Boxes)`
    : item.name,
  `${itemQty}`,                 // total quantity accounting for bundle
  `${item.price}`,       // unit selling price
  `${itemTotal}`,               // total price for this item
];

    for (let i = 0; i < rowData.length; i++) {
      page.drawRectangle({ x: currentX, y, width: colWidths[i], height: rowHeight, borderColor: rgb(0,0,0), borderWidth: 1 });
      page.drawText(rowData[i], { x: currentX + 5, y: y + 7, size: 12, font });
      currentX += colWidths[i];
    }

    y -= rowHeight;
  });

  // ---- Totals ----
  page.drawText(`Total Quantity: ${totalQty} pcs`, { x: tableX, y: y - 10, size: 12, font: boldFont });
  page.drawText(`Total Weight: ${(totalQty * 250 / 1000).toFixed(2)} Kg`, { x: tableX + 300, y: y - 10, size: 12, font: boldFont });
  page.drawText(`Total Amount: ${totalAmount} PKR`, { x: tableX + 500, y: y - 10, size: 12, font: boldFont });

  y -= 40;

  // ---- Payment Info ----
  page.drawText(`Payment Method: ${order.paymentMethod || "N/A"}`, { x: margin, y, size: 12, font });
//   page.drawText(`Payment Status: ${order.paymentStatus || "N/A"}`, { x: 300, y, size: 12, font });


  // ---- Footer ----
  page.drawText("Thank you for choosing Refyline!", { x: margin, y: 170, size: 16, font:boldFont });

  const pdfBytes = await pdf.save();
  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=parcel-slip.pdf",
    },
  });
}
