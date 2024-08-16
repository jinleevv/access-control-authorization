import { handlers } from "@/auth";
import { NextResponse } from "next/server";
import { hash, genSalt } from "bcrypt";
import prisma from "@/lib/db";

export const { GET } = handlers;

export async function POST(request: Request) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      company,
    } = await request.json();

    const saltRounds = 14;
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);

    const response = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: new Date(dateOfBirth),
        phoneNumber: phoneNumber,
        company: company,
      },
    });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
