import { StatusCodes } from "http-status-codes";
import dbConnect from "../../lib/dbConnect";
import Mosque from "../../models/mosque";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    const favoriteMosques = await Mosque.find();

    return NextResponse.json({
      count: favoriteMosques.length,
      favoriteMosques,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
