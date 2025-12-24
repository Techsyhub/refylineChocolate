
// submit review by customers
// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { rating, text, first, last, email, files } = data;

    if (!rating || !first || !email) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Create review record
    const review = await prisma.review.create({
      data: {
        rating,
        comment: text,
        customerFirstName: first,
        customerLastName: last,
        customerEmail: email,
        order:  undefined, // optional
        status: "PENDING",
      },
    });

    // Upload files to Cloudinary
    if (files && files.length > 0) {
  for (const fileBase64 of files) {
    const result = await cloudinary.uploader.upload(fileBase64, {
      resource_type: "auto",
      folder: "reviews",
    });

    await prisma.reviewFile.create({
      data: {
        reviewId: review.id,
        url: result.secure_url,
        type: result.resource_type.toUpperCase() === "VIDEO" ? "VIDEO" : "IMAGE",
      },
    });
  }
}
    // if (files && files.length > 0) {
    //   for (const file of files) {
    //     // Assume client sends base64 or URL. For file input, you need separate handling with FormData.
    //     const result = await cloudinary.uploader.upload(file, {
    //       resource_type: "auto", // automatically detect image/video
    //       folder: "reviews",
    //     });

    //     await prisma.reviewFile.create({
    //       data: {
    //         reviewId: review.id,
    //         url: result.secure_url,
    //         type: result.resource_type.toUpperCase() === "VIDEO" ? "VIDEO" : "IMAGE",
    //       },
    //     });
    //   }
    // }

    return NextResponse.json({ success: true, review });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to submit review" }, { status: 500 });
  }
}
