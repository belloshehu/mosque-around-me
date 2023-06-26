import { NextResponse } from "next/server";
import { mosques } from "../../../data";

export async function GET(request) {
  // extract query params
  const { searchParams } = new URL(request.url);

  const activity = searchParams.get("activity");
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const country = searchParams.get("country");

  const filteredMosques = mosques.filter((mosque) => {
    return (
      mosque.city.toLowerCase().includes(city.toLowerCase()) &&
      mosque.state.toLowerCase().includes(state.toLowerCase()) &&
      mosque.country.toLowerCase().includes(country.toLowerCase())
    );
  });
  return NextResponse.json(filteredMosques);
}
