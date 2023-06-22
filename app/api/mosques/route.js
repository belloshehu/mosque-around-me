import { NextResponse } from "next/server";
import { mosques } from "../../data";

export async function GET(request) {
  console.log("hello console");
  return NextResponse.json(mosques);
}
