"use client";
import { useSelector } from "react-redux";
import H3Title from "../../_components/H3Title";
import { useSession } from "next-auth/react";
import Success from "../../_components/Success";
import EidForm from "../../_components/EidForm";

const CreateEidPage = () => {
  // redirect to this page after login
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login?callbackUrl=/dashboard");
    },
  });
  const { isSuccess } = useSelector((store) => store.form);

  return (
    <section className="flex flex-col justify-center items-center gap-5">
      {!isSuccess && (
        /* do not show  after successful form submission */
        <>
          <H3Title text={"Eid prayer"} />
          <p className="text-center">Eid prayer form</p>
        </>
      )}
      {/* show only after successfull form submission */}
      {isSuccess ? (
        <Success
          titleText={"Success"}
          message="You have successfully applied for mosque admin position"
        />
      ) : (
        <EidForm />
      )}
    </section>
  );
};

export default CreateEidPage;
