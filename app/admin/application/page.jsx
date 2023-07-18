"use client";
import { useSelector } from "react-redux";
import H3Title from "../../_components/H3Title";
import MosqueAdminForm from "../../_components/MosqueAdminForm";
import { useSession } from "next-auth/react";
import Success from "../../_components/Success";
import { redirect } from "next/navigation";

const MosqueAdminPage = () => {
  // redirect to this page after login
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login?callbackUrl=/dashboard");
    },
  });
  const { isSuccess } = useSelector((store) => store.form);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      {!isSuccess && (
        /* do not show  after successful form submission */
        <>
          <H3Title text={"Mosque Admin"} />
          <p className="text-center">Mosque admin application form</p>
        </>
      )}
      {/* show only after successfull form submission */}
      {isSuccess ? (
        <Success
          titleText={"Success"}
          message="You have successfully applied for mosque admin position"
        />
      ) : (
        <MosqueAdminForm />
      )}
    </div>
  );
};

export default MosqueAdminPage;
