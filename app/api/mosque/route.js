import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";
import Mosque from "../models/mosque";
import { getServerSession } from "next-auth/next";
import { authOption } from "../auth/[...nextauth]/route";

export async function POST(request) {
  // connect to database
  await dbConnect();
  const requestBody = await request.json();
  const { name, city, state, country, address } = requestBody;

  const session = await getServerSession(authOption);

  if (!session) {
    return new NextResponse("Unthentication required", { status: 400 });
  }
  if (!name) {
    return new NextResponse("Mosque name is required", { status: 400 });
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

  const existingUser = await User.findOne({ email: session.user.email });
  if (!existingUser) {
    // throw new Error("User is not authenticated");
    return new NextResponse("User is not authenticated", { status: 400 });
  }

  const mosque = await Mosque.create({
    ...requestBody,
    image: "",
    user: existingUser._id,
  });

  return NextResponse.json({
    mosque,
    message: "Mosque added Successfully",
    success: true,
    status: 201,
  });
}

export async function GET(request) {
  await dbConnect();
  const mosques = await Mosque.find();

  return NextResponse.json({ mosques });
}
