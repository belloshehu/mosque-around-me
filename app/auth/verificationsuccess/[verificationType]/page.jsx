import Link from "next/link";
import { styles } from "../../../styles";
export const metadata = {
  title: "verify email",
};

const EmailVerificationSuccessPage = ({ params }) => {
  const { verificationType } = params;
  return (
    <div className=" flex-1 py-auto py-10 gap-5 pb-auto flex flex-col justify-center items-center">
      <div className="flex flex-col gap-5 justify-center items-center text-center w-full lg:w-1/3">
        <div>
          <h2 className="text-xl lg:text-3xl text-primary my-3">
            {verificationType === "email"
              ? "Email verification Success"
              : "Password reset Success"}
          </h2>
          <p>
            {verificationType === "email"
              ? "Your email has been verified successfully"
              : "Your password has been changed successfully"}
          </p>
        </div>
        <div className="my-3 w-full">
          <Link
            href={"/auth/login"}
            className={`${styles.buttonFluidPlain} bg-primary w-full`}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationSuccessPage;
