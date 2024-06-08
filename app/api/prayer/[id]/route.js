import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import { StatusCodes } from "http-status-codes";
import { authOption } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Prayer from "../../models/prayer";
import {
  getSubscribersEmailOnly,
  getSubscribersInfo,
  getSubscribersPhoneNunmberOnly,
} from "../../lib/getPrayerSubscribers";
import { sendNotificationEmail } from "../../../utils/mailer";

// update handler
export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const prayerId = params.id;
    const requestBody = await request.json();
    const { title, adhaanTime, iqaamaTime, mosqueId, imamName, mosqueName } =
      requestBody;

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
    if (!prayerId) {
      return new NextResponse("Provide prayer ID", {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    if (!mosqueId) {
      return new NextResponse("Provide mosque ID", {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    if (!mosqueName) {
      return new NextResponse("Provide mosque name", {
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

    const prayer = await Prayer.findById(prayerId);
    const oldAdhaanTime = prayer.adhaanTime;
    const oldIqaamaTime = prayer.iqaamaTime;

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

    const subscribersEmail = await getSubscribersEmailOnly(prayerId);
    const receivers = subscribersEmail.join(", ");
    // send notification only when there is change in time
    if (oldAdhaanTime !== adhaanTime || oldIqaamaTime !== iqaamaTime) {
      await sendNotificationEmail({
        email: receivers,
        subject: "Prayer time update",
        templateHeading: `${prayer.title} prayer time updated`,
        templateBody: `
          <p>Assalamu alaikum,</p> 
          <p> We are pleased to inform you that <b>${prayer.title}</b> prayer time at <b>${mosqueName}</b> has been updated as follows:</p>
          <div style="background-color: rgba(0, 200, 0, 0.2);">
            <h3>Adhaan time: ${prayer.adhaanTime}</h3>
            <h3>Iqaama time: ${prayer.iqaamaTime}</h3>
          </div>
          <p>May Allah make it easy for us all. </p>
          <p>Stay blessed.</p>
          `,
      });
    }
    return NextResponse.json(
      {
        message: "Prayer updated successfully",
        prayer,
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOption);
    if (!session) {
      return new NextResponse("Authentication required", {
        status: StatusCodes.UNAUTHORIZED,
      });
    }
    const id = params.id;

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

    return NextResponse.json(
      {
        prayer,
        message: "Prayer deleted successfully",
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const subscribersEmail = await getSubscribersEmailOnly(id);
    subscribersEmail.map((email) => {
      console.log(`We are sending update to  through ${email}`);
    });
    const prayer = await Prayer.findOne({ _id: id })
      .select(["mosque"])
      .populate("mosque");
    return NextResponse.json({ prayer, subscribersEmail });
  } catch (error) {
    throw new Error(error.message);
  }
}
