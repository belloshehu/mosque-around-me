import Link from "next/link";

const CodeExpired = ({ verificationType }) => {
  return (
    <section className="verification-form-body gap-5">
      <p>Verification code has expired</p>
      <Link
        href={`/auth/verificationCode/${verificationType}`}
        className="bg-primary text-white p-3">
        Resend verification code
      </Link>
    </section>
  );
};

export default CodeExpired;
