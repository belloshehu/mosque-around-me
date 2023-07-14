import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import { StatusCodes } from "http-status-codes";
import Program from "../models/program";
import Mosque from "../models/mosque";

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  console.log(body);

  const {
    title,
    description,
    keyPersonName,
    type,
    nature,
    startDate,
    stopDate,
    startTime,
    stopTime,
    customDate,
    virtualUrl,
    mosqueId,
  } = body;

  if (!title) {
    return new NextResponse("Title is required", {
      status: StatusCodes.NOT_FOUND,
    });
  }

  if (!mosqueId) {
    return new NextResponse("Provide mosque ID", {
      status: StatusCodes.BAD_REQUEST,
    });
  }
  if (!description) {
    return new NextResponse("Description is required", {
      status: StatusCodes.NOT_FOUND,
    });
  }

  if (!type) {
    return new NextResponse("Program type is required", {
      status: StatusCodes.NOT_FOUND,
    });
  }

  // for continous program, startDate and stopDate are not required but customDate
  if (type === "continous") {
    if (!customDate) {
      return new NextResponse("Custom date is required for continous program", {
        status: StatusCodes.NOT_FOUND,
      });
    }
  }

  if (type === "one-off") {
    if (!startDate || !stopDate) {
      return new NextResponse(
        "Start and stop date are required for one-off program",
        {
          status: StatusCodes.NOT_FOUND,
        }
      );
    }
  }

  if (!startTime || !stopTime) {
    return new NextResponse("Start and stop time are required", {
      status: StatusCodes.NOT_FOUND,
    });
  }
  if (!nature) {
    return new NextResponse("Pogram nature is required", {
      status: StatusCodes.NOT_FOUND,
    });
  }

  // for virtual program virtualUrl is required
  if (nature === "virtual") {
    if (!virtualUrl) {
      return new NextResponse("Virtual url is required", {
        status: StatusCodes.NOT_FOUND,
      });
    }
  }

  const existingMosque = await Mosque.findOne({ _id: mosqueId });
  if (!existingMosque) {
    return new NextResponse("Mosque does not exist", {
      status: StatusCodes.NOT_FOUND,
    });
  }

  const existingProgram = await Program.findOne({ mosque: mosqueId, title });
  if (existingProgram) {
    return new NextResponse(`${title} added already`, {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const program = await Program.create({ ...body, mosque: mosqueId });
  return NextResponse.json({
    program,
    message: "Program created successfully",
    status: StatusCodes.CREATED,
  });
}
