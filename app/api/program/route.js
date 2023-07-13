import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import { StatusCodes } from "http-status-codes";
import Program from "../models/program";

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
  } = body;

  if (!title) {
    return new NextResponse("Title is required", {
      status: StatusCodes.NOT_FOUND,
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
  const program = await Program.create(body);
  return NextResponse.json({
    program,
    message: "Program created successfully",
    status: StatusCodes.CREATED,
  });
}
