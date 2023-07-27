import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Verse from "../../models/verse";
import { StatusCodes } from "http-status-codes";

export async function POST(request) {
  try {
    await dbConnect();
    const { verseNumber, surah } = await request.json();

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

    if (!surah) {
      return new NextResponse("Surah is required", {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    // store verse number in the database
    const favoriteSurah = await Verse.create({ verseNumber, surah });
    return NextResponse.json(
      { message: "Added to favorites successfully", favoriteSurah },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const favoriteVerses = await Verse.find();
    return NextResponse.json(
      { count: favoriteVerses.length, favoriteVerses },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
