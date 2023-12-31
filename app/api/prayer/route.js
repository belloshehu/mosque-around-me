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

// update handler
export async function PATCH(request) {
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

  const prayer = await Prayer.findOne({ mosque: mosqueId, title });

  if (!prayer) {
    return new NextResponse(`Invalid prayer`, {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  prayer.title = title;
  prayer.adhaanTime = adhaanTime;
  prayer.iqaamaTime = iqaamaTime;
  prayer.imamName = imamName;

  await prayer.save();

  return NextResponse.json({
    message: "Prayer updated successfully",
    prayer,
    status: StatusCodes.CREATED,
  });
}

export async function DELETE(request) {
  await dbConnect();
  const session = await getServerSession(authOption);
  if (!session) {
    return new NextResponse("Authentication required", {
      status: StatusCodes.UNAUTHORIZED,
    });
  }
  const { id } = await request.json();
  console.log("id:", id);
  if (!id) {
    return new NextResponse("Prayer ID required", {
      status: StatusCodes.BAD_REQUEST,
    });
  }
  const prayer = await Prayer.findOneAndDelete({ _id: id });
  if (!prayer) {
    return new NextResponse("Prayer not found", {
      status: StatusCodes.NOT_FOUND,
    });
  }

  return NextResponse.json({
    prayer,
    message: "Prayer deleted successfully",
    status: StatusCodes.OK,
  });
}
