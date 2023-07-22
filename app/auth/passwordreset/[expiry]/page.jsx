import PasswordResetForm from "../../../_components/PasswordResetForm";
export const metadata = {
  title: "password reset",
};

const PasswordResetPage = ({ params }) => {
  const { expiry } = params;
  return (
    <div className=" flex-1 py-auto py-10 pb-auto flex flex-col justify-center items-center">
      <PasswordResetForm
        form_heading={"Password reset"}
        form_description={
          "Verification code was sent to your email. Enter the code below"
        }
        verificationType={"password"}
        expiry={expiry}
      />
    </div>
  );
};

export default PasswordResetPage;
