import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Verse from "../../../models/verse";
import { StatusCodes } from "http-status-codes";

export async function GET(request, { params }) {
  try {
    const verseNumber = params.number;

    if (!verseNumber) {
      return new NextResponse("Verse number is required", {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    if (verseNumber < 1) {
      return new NextResponse("Invalid verse number", {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    const favoriteVerse = await Verse.findOne({ verseNumber });
    if (!favoriteVerse) {
      return new NextResponse("Verse not found", {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    return NextResponse.json({ favoriteVerse }, { status: StatusCodes.OK });
  } catch (error) {
    throw new Error(error.message);
  }
}
