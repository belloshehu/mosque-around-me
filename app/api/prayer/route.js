import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import { StatusCodes } from "http-status-codes";
import { authOption } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Mosque from "../models/mosque";
import Prayer from "../models/prayer";

export async function POST(request) {
  await dbConnect();
  const requestBody = await request.json();
  const { title, adhaanTime, iqaamaTime, mosqueId, imamName } = requestBody;

  const session = await getServerSession(authOption);
  if (!session) {
    return new NextResponse("Authentication required", {
      status: StatusCodes.UNAUTHORIZED,
    });
  }
  if (!title) {
    return new NextResponse("Provide prayer title", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  if (!adhaanTime) {
    return new NextResponse("Provide Adhaan time", {
      status: StatusCodes.BAD_REQUEST,
    });
  }
  if (!iqaamaTime) {
    return new NextResponse("Provide Iqaama time", {
      status: StatusCodes.BAD_REQUEST,
    });
  }
  console.log(mosqueId);
  if (!mosqueId) {
    return new NextResponse("Provide mosque ID", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  // get hours and minutes for both Iqaama and Adhaan to ensure that Iqaama time is ahead
  const [iqaamaHour, iqaamaMinute] = iqaamaTime.split(":");
  const [adhaanHour, adhaanMinute] = adhaanTime.split(":");

  if (iqaamaHour === adhaanHour && iqaamaMinute < adhaanMinute) {
    // iqaama comes some minute after adhaan
    return new NextResponse("Invalid prayer time", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const existingMosque = await Mosque.findOne({ _id: mosqueId });
  if (!existingMosque) {
    return new NextResponse("Mosque does not exist", {
      status: StatusCodes.NOT_FOUND,
    });
  }

  const existingPrayer = await Prayer.findOne({ mosque: mosqueId, title });
  console.log(existingPrayer);
  if (existingPrayer) {
    return new NextResponse(`${title} added already`, {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const prayer = await Prayer.create({
    title,
    adhaanTime,
    iqaamaTime,
    imamName,
    mosque: mosqueId,
  });

  return NextResponse.json({
    message: "Prayer added successfully",
    prayer,
    status: StatusCodes.CREATED,
  });
}
