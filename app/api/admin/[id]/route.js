import { NextResponse } from "next/server";
import AdminUser from "../../models/admin";
import { StatusCodes } from "http-status-codes";
import User from "../../models/User";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";

export async function PATCH(request, { params }) {
  const { id: adminUserId } = params;

  const existingAdminUser = await AdminUser.findById(adminUserId).populate(
    "user"
  );
  if (!existingAdminUser) {
    return NextResponse.json(
      {
        message: "User not found",
        success: false,
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  existingAdminUser.verified = !existingAdminUser.verified;
  let message = "";
  if (existingAdminUser.verified) {
    message = "Admin User approved";
  } else {
    message = "Admin User disapproved";
  }
  await existingAdminUser.save();
  return NextResponse.json(
    {
      adminUser: existingAdminUser,
      success: true,
      message,
    },
    { status: StatusCodes.OK }
  );
}
