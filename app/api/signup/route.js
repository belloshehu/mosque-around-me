import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";
import { sendVerificationEmail } from "../../utils/mailer";
import { StatusCodes } from "http-status-codes";

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

  // send email to user's email address
  await sendVerificationEmail({
    email,
    emailType: "VERIFY_EMAIL",
    userId: user._id,
  });
  return NextResponse.json(
    {
      message: "Signed up successfully",
      user,
      verificationCodeExpiry: parseInt(process.env.v_CODE_EXPIRATION) / 1000,
    },
    { status: StatusCodes.OK }
  );
}
