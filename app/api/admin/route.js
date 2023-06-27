import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";
import { AdminUser } from "../models/admin";

export async function POST(request) {
  try {
    await dbConnect();
  } catch (error) {
    console.log("Failed to connect to db");
  }

  const requestBody = await request.json();

  const { mosqueName, positionInMosque, city, state, country, address, user } =
    requestBody;

  if (!user) {
    return new NextResponse("Unthentication required", { status: 400 });
  }
  if (!mosqueName) {
    return new NextResponse("Mosque name is required", { status: 400 });
  }
  if (!positionInMosque) {
    return new NextResponse("Position in mosque is required", { status: 400 });
  }
  if (!address) {
    return new NextResponse("Address is required", { status: 400 });
  }
  if (!city) {
    return new NextResponse("City is required", { status: 400 });
  }
  if (!state) {
    return new NextResponse("State is required", { status: 400 });
  }
  if (!country) {
    return new NextResponse("Country is required", { status: 400 });
  }

  const existingUser = await User.findOne({ email: user.email });
  if (!existingUser) {
    // throw new Error("User is not authenticated");
    return new NextResponse("User is not authenticated", { status: 400 });
  }
  const adminUser = await Admin;
  return NextResponse.json({ admin: { ...requestBody } });
}
