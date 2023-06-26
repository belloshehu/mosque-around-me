import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";

export async function POST(request) {
  await dbConnect();
  // request body data
  const { email, password, firstName, otherName, phoneNumber } =
    await request.json();

  if (!email) {
    return new NextResponse("email is required", { status: 400 });
  }

  if (!firstName) {
    return new NextResponse("first name is required", { status: 400 });
  }

  if (!otherName) {
    return NextResponse("other name is required", { status: 400 });
  }

  if (!password) {
    return new NextResponse("password is required", { status: 400 });
  }

  if (!phoneNumber) {
    return new NextResponse("phone number is required", { status: 400 });
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email already registered", { status: 400 });
  }
  const user = await User.create({
    email,
    firstName,
    otherName,
    password,
    phoneNumber,
  });

  return NextResponse.json(
    {
      message: "Signed up successfully",
      user,
    },
    { status: 201 }
  );
}
