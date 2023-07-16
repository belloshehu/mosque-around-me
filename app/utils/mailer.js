import nodemailer from "nodemailer";
import User from "../api/models/User";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    let verificationCode = Math.floor(Math.random() * 1000000).toString();

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
          forgotPasswordCodeExpiry: process.env.V_CODE_EXPIRATION,
        },
        { runValidators: true, new: true }
      );
    } else if (emailType === "VERIFY_EMAIL") {
      await User.findByIdAndUpdate(
        userId,
        {
          verificationCode: verificationCode,
          verificationCodeExpiry: process.env.V_CODE_EXPIRATION,
        },
        { runValidators: true, new: true }
      );
    }

    // email transport
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject:
        emailType === "VERIFY_EMAIL"
          ? "Verify your email"
          : "Reset your password",
      html: `<p>
                Please copy the following code to ${
                  emailType === "VERIFY_EMAIL"
                    ? "verify your email"
                    : "reset your password"
                }
            </p>
            <h3>${verificationCode}</h3>`,
    };
    const emailresponse = await transport.sendMail(emailOptions);
    return emailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
