import { NextResponse } from "next/server";
import FavoriteMosque from "../../../models/favoriteMosque";
import dbConnect from "../../../lib/dbConnect";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth/next";
import { authOption } from "../../../auth/[...nextauth]/route";
import User from "../../../models/User";
import Mosque from "../../../models/mosque";

export async function POST(request, { params }) {
  console.log("addding to fav");
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
      // throw new Error("User is not authenticated");
      return new NextResponse("User is not authenticated", {
        status: StatusCodes.UNAUTHORIZED,
      });
    }

    const mosqueId = params.id;
    if (!mosqueId) {
      return new NextResponse("Mosque Id is required", {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    const mosque = await Mosque.findOne({ _id: mosqueId });
    if (!mosque) {
      return new NextResponse(`Mosque with id of ${mosqueId} not found`, {
        status: StatusCodes.NOT_FOUND,
      });
    }

    const isFavorite = await FavoriteMosque.findOne({
      user: user._id,
      mosqueId,
    });
    if (isFavorite) {
      return new NextResponse("Already a favorite", {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    const favoriteMosque = await FavoriteMosque.create({
      user: user._id,
      mosqueId,
    });

    return NextResponse.json(
      {
        favoriteMosque,
        message: "Mosque added to favorites",
      },
      { status: StatusCodes.CREATED }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
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

    const mosqueId = params.id;

    if (!mosqueId) {
      return new NextResponse("Mosque Id is required", {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    const mosque = await Mosque.findOne({ _id: mosqueId });
    if (!mosque) {
      return new NextResponse(`Mosque with id of ${mosqueId} not found`, {
        status: StatusCodes.NOT_FOUND,
      });
    }

    const favoriteMosque = await FavoriteMosque.findOneAndDelete({
      user: user._id,
      mosqueId,
    });

    return NextResponse.json(
      {
        favoriteMosque,
        message: "Mosque removed from favorites",
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
