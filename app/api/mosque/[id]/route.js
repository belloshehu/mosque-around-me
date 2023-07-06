import { NextResponse } from "next/server";
import Mosque from "../../models/mosque";
import dbConnect from "../../lib/dbConnect";
import mongoose from "mongoose";

export async function GET(request, { params }) {
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
        as: "prayers",
      },
    },
    // {
    //   $unwind: "$prayers",
    // },
  ]);
  const mosque = await Mosque.populate(result, "user");
  console.log(mosque);
  return NextResponse.json({ mosque });
}
