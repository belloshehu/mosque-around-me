import { authOption } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import dbConnect from "../lib/dbConnect";
import Notification from "../models/notification";
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

export async function GET(request) {
  await dbConnect();
  const session = await getServerSession(authOption);
  try {
    if (!session) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const notifications = await Notification.find()
      .where("to")
      .all([session.user._id]);
    return NextResponse.json(
      {
        notifications,
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
