import { NextResponse } from "next/server";
import User from "../models/User";
import dbConnect from "../lib/dbConnect";
import StatusCodes from "http-status-codes";
export async function GET(request) {
  return new Response("Login api");
}

export async function POST(request) {
  await dbConnect();
  //request body
  const { email, password } = await request.json();
  if (!email)
    return NextResponse.json({ message: "email is required", success: false });
  if (!password)
    return NextResponse.json(
      {
        message: "password is required",
        success: false,
      },
      { status: StatusCodes.BAD_REQUEST }
    );

  const user = await User.findOne({ email, password });
  if (!user) {
    return NextResponse.json(
      {
        message: "Incorrect email or password",
        success: false,
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  return NextResponse.json({ message: "login", user: { email, password } });
}
