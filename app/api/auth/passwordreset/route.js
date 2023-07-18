import { NextResponse } from "next/server";
import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await dbConnect();
    const { password, code: forgotPasswordCode } = await request.json();

    const user = await User.findOne({
      forgotPasswordCode,
      forgotPasswordCodeExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return new NextResponse("Invalid code", {
        status: StatusCodes.NOT_FOUND,
      });
    }

    // old and new password cannot be the same
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      return new NextResponse("Old and new password cannot be the same", {
        status: StatusCodes.BAD_REQUEST,
      });
    }

    user.password = password;
    user.forgotPasswordCode = undefined;
    user.forgotPasswordCodeExpiry = undefined;
    user.save();

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    throw new Error(error.message());
  }
}
