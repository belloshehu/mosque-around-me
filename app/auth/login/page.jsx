"use client";
import { useEffect } from "react";
import LoginForm from "../../_components/LoginForm";
import H3Title from "../../_components/H3Title";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session]);
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <H3Title text={"Login"} />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
