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

export async function PATCH(request, { params }) {
  await dbConnect();

  const { serviceId, service, mosqueId } = params;

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

  const subscription = await Subscription.findOneAndDelete({
    service: serviceId,
    user: user._id,
  });

  if (!subscription) {
    return new NextResponse("Subscription not found", {
      status: StatusCodes.NOT_FOUND,
    });
  }
  return NextResponse.json({
    message: "Unsubscribed successfully",
    subscription,
    status: StatusCodes.OK,
  });
}
