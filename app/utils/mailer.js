import nodemailer from "nodemailer";
import User from "../api/models/User";
import { getEmailTemplate } from "./mailTemplate";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    let verificationCode = Math.random().toString().substring(2, 8);

    // ensure no user uses similar code
    const user = await User.findOne({ verificationCode });
    if (user) {
      verificationCode = Math.floor(Math.random() * 1000000).toString();
    }

    if (emailType === "PASSWORD_RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordCode: verificationCode,
          forgotPasswordCodeExpiry:
            Date.now() + parseInt(process.env.V_CODE_EXPIRATION),
        },
        { runValidators: true, new: true }
      );
    } else if (emailType === "VERIFY_EMAIL") {
      await User.findByIdAndUpdate(
        userId,
        {
          verificationCode: verificationCode,
          verificationCodeExpiry:
            Date.now() + parseInt(process.env.V_CODE_EXPIRATION),
        },
        { runValidators: true, new: true }
      );
    }

    // email transport
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailTextHeading =
      emailType === "VERIFY_EMAIL"
        ? "Verify your email"
        : "Reset your password";

    const emailTextBody =
      emailType === "VERIFY_EMAIL"
        ? `Copy the code below to verify your email <h2>${verificationCode}</h2>`
        : `Copy the code below to reset your password <h2>${verificationCode}</h2>`;

    const emailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject:
        emailType === "VERIFY_EMAIL"
          ? "Verify your email"
          : "Reset your password",
      html: getEmailTemplate(emailTextBody, emailTextHeading),
    };
    const emailresponse = await transport.sendMail(emailOptions);
    return emailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
