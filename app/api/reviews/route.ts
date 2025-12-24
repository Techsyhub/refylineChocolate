// // Example: GET /api/reviews?status=APPROVED&page=1&limit=4
// import prisma from "@/app/libs/prisma";


// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const page = Number(searchParams.get("page") || 1);
//   const limit = Number(searchParams.get("limit") || 4);
//   const status = searchParams.get("status") || "APPROVED";

//   const reviews = await prisma.review.findMany({
//     where: { status: status },
//     orderBy: { createdAt: "desc" },
//     skip: (page - 1) * limit,
//     take: limit,
//   });

//   return new Response(JSON.stringify({ reviews }));
// }


// Example: GET /api/reviews?status=APPROVED&page=1&limit=4
import prisma from "@/app/libs/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 4);
  const status = searchParams.get("status") || "APPROVED";

  const reviews = await prisma.review.findMany({
    where: { status: status },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      files: true, // fetch all files related to this review
    },
  });

  return new Response(JSON.stringify({ reviews }));
}
