import { StatusCodes } from "http-status-codes";
import dbConnect from "../../lib/dbConnect";
import FavoriteMosque from "../../models/favoriteMosque";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOption } from "../../auth/[...nextauth]/route";
import User from "../../models/User";

export async function GET(request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOption);

    if (!session.user) {
      return new NextResponse("Unthentication required", {
        status: StatusCodes.UNAUTHORIZED,
      });
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      // throw new Error("User is not authenticated");
      return new NextResponse("User is not authenticated", {
        status: StatusCodes.UNAUTHORIZED,
      });
    }

    const favoriteMosques = await FavoriteMosque.find({
      user: user._id,
    }).populate("mosqueId");

    return NextResponse.json({
      count: favoriteMosques.length,
      favoriteMosques,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
