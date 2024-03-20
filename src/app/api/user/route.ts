import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import {type NextRequest} from 'next/server';

export async function GET(request: NextRequest) {
  try {
     const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Missing required parameter: email" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return NextResponse.json({
        message: "User found",
        data: user,
        status: 200,
      });
    } else {
      return NextResponse.json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error",status:500 }
    );
  }
}

export async function POST(request: any) {
  try {
    const res = await request.json();
    const { email, name, password, image } = res;
    const result = await prisma.user.create({
      data: {
        email,
        name,
        password,
        image,
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { message: error ,status:500}
    );
  }
}
