import { handlers } from "@/auth";
import { NextResponse } from "next/server";
import { hash, genSalt } from "bcrypt";
import prisma from "@/lib/prisma";

export const { GET } = handlers;

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    const saltRounds = 14;
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);

    const response = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
