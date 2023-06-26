"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  // redirect to this page after login
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login?callbackUrl=/dashboard");
    },
  });
  return (
    <div className="p-5 lg:p-24 w-full min-h-full text-center">
      <h1>Dashboard</h1>
      <p>Hi, {session?.user.name || session?.user.email}</p>
    </div>
  );
};

export default DashboardPage;
