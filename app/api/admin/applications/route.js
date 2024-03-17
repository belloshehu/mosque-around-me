import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import AdminUser from "../../models/admin";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOption);
  try {
    await dbConnect();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const { user } = session;
    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const existingAdminUser = await AdminUser.findOne({
      user: user._id,
    }).populate("user");

    console.log(existingAdminUser, user._id);
    return NextResponse.json(
      {
        adminUser: existingAdminUser,
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
