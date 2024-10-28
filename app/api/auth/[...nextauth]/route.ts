import { handlers } from "@/auth";
import { NextResponse } from "next/server";
import { hash, genSalt } from "bcrypt";
import prisma from "@/lib/db";

export const { GET } = handlers;

export async function POST(request: Request) {
  try {
    const {
      admin,
      security,
      email,
      password,
      firstName,
      lastName,
      department,
    } = await request.json();

    const saltRounds = 14;
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);

    const response = await prisma.user.create({
      data: {
        admin: admin,
        security: security,
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        department: department,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (e) {
    // console.log({ e });
    return NextResponse.json({ message: "fail" });
  }
}
