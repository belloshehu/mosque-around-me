"use client";
import { useSelector } from "react-redux";
import H3Title from "../../../_components/H3Title";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Success from "../../../_components/Success";
import PrayerForm from "../../../_components/PrayerForm";

const CreatePrayerPage = ({ params }) => {
  const mosqueId = params.mosqueId;
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
          <H3Title text={"New Prayer"} />
          <p className="text-center">
            Add details of the prayer you wish to add
          </p>
        </>
      )}
      {/* show only after successfull form submission */}
      {isSuccess ? (
        <Success
          titleText={"Success"}
          message="You have successfully added a prayer"
          redirectUrl={`/mosque/${mosqueId}`}
          redirectText={"Go back to mosque"}
        />
      ) : (
        <PrayerForm mosqueId={mosqueId} />
      )}
    </div>
  );
};

export default CreatePrayerPage;
