"use client";
import { useSelector } from "react-redux";
import H3Title from "../../_components/H3Title";
import { useSession } from "next-auth/react";
import Success from "../../_components/Success";
import MosqueForm from "../../_components/MosqueForm";

const CreateMosquePage = () => {
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
          <H3Title text={"New Mosque"} />
          <p className="text-center">
            Add details of the mosque you wish to manage
          </p>
        </>
      )}
      {/* show only after successfull form submission */}
      {isSuccess ? (
        <Success
          titleText={"Success"}
          message="You have successfully added a mosque"
        />
      ) : (
        <MosqueForm />
      )}
    </div>
  );
};

export default CreateMosquePage;
