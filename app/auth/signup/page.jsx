"use client";
import { useEffect } from "react";
import H3Title from "../../_components/H3Title";
import SignupForm from "../../_components/SignupForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session]);
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <H3Title text={"Signup"} />
      <SignupForm />
    </div>
  );
};

export default SignupPage;
