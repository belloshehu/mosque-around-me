import { NextResponse } from "next/server";
import Mosque from "../../models/mosque";
import dbConnect from "../../lib/dbConnect";

export async function GET(request, { params }) {
  await dbConnect();

  const id = params.id;
  const mosque = await Mosque.findOne({ _id: id });

  return NextResponse.json({ mosque });
}
