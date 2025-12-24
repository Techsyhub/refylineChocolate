import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: Request) {
  const { action, email, password } = await req.json();

  if (!action) return NextResponse.json({ error: "Action required" }, { status: 400 });

  try {
    if (action === "register") {
      if (!email || !password)
        return NextResponse.json({ error: "Email and password required" }, { status: 400 });

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser)
        return NextResponse.json({ error: "User already exists" }, { status: 400 });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({ data: { email, password: hashedPassword } });
      return NextResponse.json({ success: true, userId: user.id });

    } else if (action === "login") {
      if (!email || !password)
        return NextResponse.json({ error: "Email and password required" }, { status: 400 });

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

       const response = NextResponse.json({ success: true });
        response.cookies.set("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 , // 1 day
          sameSite: "strict",
        });

      return NextResponse.json({ success: true, token });

    } else {
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
