"use client";
import H3Title from "../../_components/H3Title";
import MosqueAdminForm from "../../_components/MosqueAdminForm";
import { useSession } from "next-auth/react";

const MosqueAdminPage = () => {
  // redirect to this page after login
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login?callbackUrl=/dashboard");
    },
  });

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <H3Title text={"Mosque Admin"} />
      <p className="text-center">
        Want to apply for mosque admin position? Fill the form below
      </p>
      <MosqueAdminForm />
    </div>
  );
};

export default MosqueAdminPage;
