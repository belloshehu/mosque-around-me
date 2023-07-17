import { NextResponse } from "next/server";
import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";
import { StatusCodes } from "http-status-codes";

export async function POST(request) {
  try {
    await dbConnect();
    const { code: verificationCode } = await request.json();
    console.log(verificationCode.length);
    const user = await User.findOne({
      verificationCode,
      verificationCodeExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return new NextResponse("Invalid code", {
        status: StatusCodes.NOT_FOUND,
      });
    }

    user.emailVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiry = undefined;
    user.save();

    return NextResponse.json(
      { message: "Email verified" },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
