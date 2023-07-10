import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { StatusCodes } from "http-status-codes";
import { authOption } from "../../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Prayer from "../../../../models/prayer";
// import Program from '../../../models/Program';
import Subscription from "../../../../models/subscription";
import User from "../../../../models/User";

export async function POST(request, { params }) {
  await dbConnect();

  const { serviceId, service, mosqueId } = params;
  console.log(service, serviceId);
  const session = await getServerSession(authOption);
  if (!session) {
    return new NextResponse("Authentication required", {
      status: StatusCodes.UNAUTHORIZED,
    });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    // throw new Error("User is not authenticated");
    return new NextResponse("User is not authenticated", { status: 400 });
  }

  if (!serviceId) {
    return new NextResponse("Provide service ID", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  if (!mosqueId) {
    return new NextResponse("Provide mosque ID", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const existingPrayer = await Prayer.findOne({ _id: serviceId });
  if (service === "prayer") {
    if (!existingPrayer) {
      return new NextResponse(`Prayer with ID ${serviceId} was found`, {
        status: StatusCodes.BAD_REQUEST,
      });
    }
  }

  // const existingProgram = await Program.findOne({ _id: serviceId });
  // if (service === "program") {
  //   if (!existingProgram) {
  //     return new NextResponse(`Program with ID ${serviceId} was found`, {
  //       status: StatusCodes.BAD_REQUEST,
  //     });
  //   }
  // }

  const subscription = await Subscription.create({
    user: user._id,
    service: serviceId,
    mosque: mosqueId,
  });

  // add subscription to the prayer's list of subscriptions
  // if (service === "prayer") {
  //   existingPrayer.subscriptions = [
  //     ...existingPrayer.subscriptions,
  //     subscription._id,
  //   ];
  // }

  // // add subscription to the program's list of subsriptions
  // if (service === "program") {
  //   existingProgram.subscriptions = [
  //     ...existingProgram.subscriptions,
  //     subscription._id,
  //   ];
  // }

  return NextResponse.json({
    message: "Subscribed successfully",
    subscription,
    status: StatusCodes.CREATED,
  });
}

// update handler
export async function PATCH(request) {
  await dbConnect();
  const requestBody = await request.json();
  const { title, adhaanTime, iqaamaTime, mosqueId, imamName } = requestBody;

  const session = await getServerSession(authOption);
  if (!session) {
    return new NextResponse("Authentication required", {
      status: StatusCodes.UNAUTHORIZED,
    });
  }
  if (!title) {
    return new NextResponse("Provide prayer title", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  if (!adhaanTime) {
    return new NextResponse("Provide Adhaan time", {
      status: StatusCodes.BAD_REQUEST,
    });
  }
  if (!iqaamaTime) {
    return new NextResponse("Provide Iqaama time", {
      status: StatusCodes.BAD_REQUEST,
    });
  }
  console.log(mosqueId);
  if (!mosqueId) {
    return new NextResponse("Provide mosque ID", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  // get hours and minutes for both Iqaama and Adhaan to ensure that Iqaama time is ahead
  const [iqaamaHour, iqaamaMinute] = iqaamaTime.split(":");
  const [adhaanHour, adhaanMinute] = adhaanTime.split(":");

  if (iqaamaHour === adhaanHour && iqaamaMinute < adhaanMinute) {
    // iqaama comes some minute after adhaan
    return new NextResponse("Invalid prayer time", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const prayer = await Prayer.findOne({ mosque: mosqueId, title });

  if (!prayer) {
    return new NextResponse(`Invalid prayer`, {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  prayer.title = title;
  prayer.adhaanTime = adhaanTime;
  prayer.iqaamaTime = iqaamaTime;
  prayer.imamName = imamName;

  await prayer.save();

  return NextResponse.json({
    message: "Prayer updated successfully",
    prayer,
    status: StatusCodes.CREATED,
  });
}

export async function DELETE(request) {
  await dbConnect();
  const session = await getServerSession(authOption);
  if (!session) {
    return new NextResponse("Authentication required", {
      status: StatusCodes.UNAUTHORIZED,
    });
  }
  const { id } = await request.json();
  console.log("id:", id);
  if (!id) {
    return new NextResponse("Prayer ID required", {
      status: StatusCodes.BAD_REQUEST,
    });
  }
  const prayer = await Prayer.findOneAndDelete({ _id: id });
  if (!prayer) {
    return new NextResponse("Prayer not found", {
      status: StatusCodes.NOT_FOUND,
    });
  }

  return NextResponse.json({
    prayer,
    message: "Prayer deleted successfully",
    status: StatusCodes.OK,
  });
}
