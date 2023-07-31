import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import dbConnect from "../../lib/dbConnect";
import FavoriteMosque from "../../models/favoriteMosque";
import { getServerSession } from "next-auth/next";
import { authOption } from "../../auth/[...nextauth]/route";
import User from "../../models/User";

export async function GET(request) {
  await dbConnect();
  const session = await getServerSession(authOption);
  try {
    if (!session.user) {
      return new NextResponse("Unthentication required", {
        status: StatusCodes.UNAUTHORIZED,
      });
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return new NextResponse("User is not authenticated", {
        status: StatusCodes.UNAUTHORIZED,
      });
    }

    const favoriteMosques = await FavoriteMosque.find({
      user: user._id,
    });

    return NextResponse.json({
      favoriteMosques,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
