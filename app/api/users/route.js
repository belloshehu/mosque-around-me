import { NextResponse } from "next/server";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";

export async function GET(request) {
  const users = await User.find({ role: "admin" });

  console.log(users);
  return NextResponse.json(
    {
      users,
    },
    { status: StatusCodes.OK }
  );
}
