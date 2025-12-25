export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { DUO_BUNDLE, TRIO_BUNDLE } from "@/app/constants/main";

function getParams<T>(params: T): Promise<T> {
  return Promise.resolve(params);
}

export async function GET(
   req: NextRequest,
   context: { params: Promise<{ id: string; }>; } // ✅ must be plain object
 ) {
   
   const {id} = await context.params;
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
  // convert Uint8Array to Buffer
const buffer = Buffer.from(pdfBytes);
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=parcel-slip.pdf",
    },
  });
}
