import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";
import EidPrayer from "../models/eidPrayer";
import { StatusCodes } from "http-status-codes";

export async function GET() {
  await dbConnect();
  try {
    const eidPrayers = await EidPrayer.find({});
    return NextResponse.json({
      eidPrayers,
      count: eidPrayers.length,
      success: true,
      status: StatusCodes.OK,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function POST(request) {
  // connect to database
  await dbConnect();
  const requestBody = await request.json();
  const { mosqueName, date, time, city, state, country, address, user } =
    requestBody;

  if (!user) {
    return new NextResponse("Unthentication required", { status: 400 });
  }
  if (!mosqueName) {
    return new NextResponse("Mosque name is required", { status: 400 });
  }
  if (!date) {
    return new NextResponse("Date is required", { status: 400 });
  }
  if (!time) {
    return new NextResponse("Time is required", { status: 400 });
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

  /* 
        It is necessary to restructure the date string because,
        Date() contructur does not work with the structure day/month/year. 
        It  expects month/day/year
 */
  const newDate = new Date(date).toLocaleDateString().split("/");
  // interchange day and month positions
  const restructuredDate = `${newDate[1]}/${newDate[0]}/${newDate[2]}`;

  const todaysDate = new Date().toLocaleDateString().split("/");
  // interchange day and month positions
  const restructuredTodaysDate = `${todaysDate[1]}/${todaysDate[0]}/${todaysDate[2]}`;

  // date is valid if it is today or ahead of today
  const isValidDate =
    new Date(restructuredTodaysDate).getTime() <=
    new Date(restructuredDate).getTime();
  if (!isValidDate) {
    return new NextResponse("Date is invalid", { status: 400 });
  }

  const existingUser = await User.findOne({ email: user.email });
  if (!existingUser) {
    // throw new Error("User is not authenticated");
    return new NextResponse("User is not authenticated", { status: 400 });
  }

  const eidPrayer = await EidPrayer.create({
    ...requestBody,
    user: existingUser._id,
  });

  return NextResponse.json({
    eidPrayer,
    message: "Eid prayer added Successfully",
    success: true,
    status: 201,
  });
}
