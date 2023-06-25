import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export async function POST(request) {
  try {
    await dbConnect();
  } catch (error) {
    console.log(error);
  }
  // request body data
  const { email, password, firstName, otherName, phoneNumber } =
    await request.json();

  if (!email) {
    return NextResponse.json({
      message: "email is required",
      success: false,
    });
  }

  if (!firstName) {
    return NextResponse.json({
      message: "first name is required",
      success: false,
    });
  }

  if (!otherName) {
    return NextResponse.json({
      message: "other name is required",
      success: false,
    });
  }

  if (!password) {
    return NextResponse.json({
      message: "password is required",
      success: false,
    });
  }

  if (!phoneNumber) {
    return NextResponse.json({
      message: "phone number is required",
      success: false,
    });
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json({ message: "Email already registered" });
  }
  const user = await User.create({
    email,
    firstName,
    otherName,
    password,
    phoneNumber,
  });

  return NextResponse.json({
    message: "Signed up successfully",
    user,
  });
}
