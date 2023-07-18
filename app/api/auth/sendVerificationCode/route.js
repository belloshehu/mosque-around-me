import { NextResponse } from "next/server";
import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";
import { StatusCodes } from "http-status-codes";
import { sendEmail } from "../../../utils/mailer";

export async function POST(request) {
  try {
    await dbConnect();
    const { email, verificationType } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("Incorrect email", {
        status: StatusCodes.NOT_FOUND,
      });
    }

    if (user.emailVerified && verificationType == "email") {
      return new NextResponse("Email already verified", {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    sendEmail({
      email,
      emailType:
        verificationType === "email" ? "VERIFY_EMAIL" : "PASSWORD_RESET",
      userId: user._id,
    });
    return NextResponse.json(
      {
        message: "Email verification code sent",
        verificationCodeExpiry: parseInt(process.env.v_CODE_EXPIRATION) / 1000,
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
