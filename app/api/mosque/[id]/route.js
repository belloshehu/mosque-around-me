import { NextResponse } from "next/server";
import Mosque from "../../models/mosque";
import dbConnect from "../../lib/dbConnect";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { authOption } from "../../auth/[...nextauth]/route";
import User from "../../models/User";
import { getServerSession } from "next-auth/next";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const id = params.id;

    const result = await Mosque.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "prayers",
          localField: "_id",
          foreignField: "mosque",
          pipeline: [
            {
              $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "service",
                as: "subscriptions",
              },
            },
          ],
          as: "prayers",
        },
      },
      {
        $lookup: {
          from: "programs",
          localField: "_id",
          foreignField: "mosque",
          pipeline: [
            {
              $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "service",
                as: "subscriptions",
              },
            },
          ],
          as: "programs",
        },
      },
    ]);
    const mosque = await Mosque.populate(result, "user");
    return NextResponse.json({ mosque: mosque[0] });
  } catch (error) {
    throw new Error(error.message);
  }
}
