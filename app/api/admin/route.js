import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";
import AdminUser from "../models/admin";
import { StatusCodes } from "http-status-codes";
import { sendNotificationEmail } from "../../utils/mailer";

export async function POST(request) {
  try {
    await dbConnect();
  } catch (error) {
    console.log("Failed to connect to db");
  }

  const requestBody = await request.json();

  const { mosqueName, positionInMosque, city, state, country, address, user } =
    requestBody;

  if (!user) {
    return new NextResponse("Unthentication required", { status: 400 });
  }
  if (!mosqueName) {
    return new NextResponse("Mosque name is required", { status: 400 });
  }
  if (!positionInMosque) {
    return new NextResponse("Position in mosque is required", { status: 400 });
  }
  if (!address) {
    return new NextResponse("Address is required", { status: 400 });
  }
  if (!city) {
    return new NextResponse("City is required", { status: 400 });
  }
  if (!state) {
    return new NextResponse("State is required", { status: 400 });
  }
  if (!country) {
    return new NextResponse("Country is required", { status: 400 });
  }

  const existingUser = await User.findOne({ email: user.email });
  if (!existingUser) {
    // throw new Error("User is not authenticated");
    return new NextResponse("User is not authenticated", { status: 400 });
  }
  const adminUser = await AdminUser.create({
    mosqueName,
    position: positionInMosque,
    address,
    city,
    state,
    country,
    user: existingUser._id,
  });

  // send email notification to mosqueconnect email
  await sendNotificationEmail({
    email: process.env.EMAIL_USER,
    subject: "Admin Application",
    templateHeading: `${adminUser.adminType} application`,
    templateBody: `
          <p>Application for ${adminUser.adminType} received.</p>
          <p>Application details:</p>

          <div style="background-color: rgba(0, 0, 0, 0.2); padding: 2rem;>
            <p>User: <span>${user.firstName} ${user.otherName}</span></p>
            <p>Mosque: <span>${mosqueName} at${address}, ${city}, ${state}, ${country}</span></p>
          </div>
          `,
  });

  return NextResponse.json({
    adminUser,
    message: "Successfully applied",
    success: true,
    status: 201,
  });
}

export async function GET(request) {
  const adminUsers = await AdminUser.find().populate("user");
  return NextResponse.json(
    {
      adminUsers,
    },
    { status: StatusCodes.OK }
  );
}
