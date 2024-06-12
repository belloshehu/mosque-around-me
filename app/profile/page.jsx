"use client";
import { Suspense, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { styles } from "../styles";
import { getAPIPayload, getMosques } from "../utils/api";
import { useSession } from "next-auth/react";
import TabCollection from "../_components/TabCollection";
import { profilePageTabsData } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "../GlobalRedux/features/modal/modalSlice";
import ModalWrapper from "../_components/ModalWrapper";
import MosqueForm from "../_components/MosqueForm";
import Mosque from "../_components/Mosque";
import PositionApplication from "../_components/PositionApplication";

const renderMosqueTabContent = (mosques) => {
  return (
    <article className="flex flex-col gap-4 text-left  my-5 lg:my-10">
      <div className="grid grid-flo grid-cols-1 gap-2 p-0">
        <Suspense
          fallback={
            <div>
              <span>loading mosques ...</span>
            </div>
          }>
          {mosques ? (
            <ul className="">
              {mosques?.map((mosque) => (
                <Mosque key={mosque._id} {...mosque} />
              ))}
            </ul>
          ) : (
            <button
              onClick={() => dispatch(showForm("mosque"))}
              className={`${styles.buttonFluidPlain} bg-primary text-white w-fit `}>
              Add mosque
            </button>
          )}
        </Suspense>
      </div>
    </article>
  );
};

const renderProgramTabContent = () => {
  return (
    <div className="flex flex-col gap-4 text-left  my-5 lg:my-10">
      <div>
        <Link
          href={"/eid/create"}
          className={`${styles.buttonFluidPlain} bg-primary `}>
          Add Eid ground/mosque
        </Link>
      </div>
    </div>
  );
};

const renderApplicationTabContent = (application) => {
  return (
    <div className="flex flex-col gap-4 text-left my-5 lg:my-10">
      <div>
        <Suspense
          fallback={
            <div>
              <span>loading application ...</span>
            </div>
          }>
          {application ? (
            <PositionApplication application={application} />
          ) : (
            <div className="flex flex-col gap-3 items-center">
              <p>You have no applications</p>
              <Link
                href={"/admin/mosque"}
                className={`${styles.buttonFluidPlain} bg-primary`}>
                Apply for mosque admin
              </Link>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  // redirect to this page after login
  const dispatch = useDispatch();
  const { mosqueFormVisible } = useSelector((store) => store.modal);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login?callbackUrl=/profile");
    },
  });

  const [mosques, setMosques] = useState([]);
  const [application, setApplication] = useState(null);

  const getData = async () => {
    const data = await getMosques();
    const response = await getAPIPayload(`/api/admin/applications`);
    setApplication(response?.adminUser);
    setMosques(data);
    console.log(response);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="w-full min-h-screen text-center flex-1 flex flex-col gap-4 justify-start items-start">
      <h2 className="text-2xl font-bold text-primary">Profile</h2>
      <div className="h-[200px] w-full rounded-md bg-purple-200 flex items-center justify-center ">
        <p className="p-4 py-2 text-white">
          {session?.user?.firstName} {session?.user?.otherName}
        </p>
      </div>
      <TabCollection tabDataArray={profilePageTabsData}>
        {/* render mosque tab content: added mosque or button to add a mosque */}
        {renderMosqueTabContent(mosques)}

        {/* render eid program tab contents: programs, eid prayer or button to add any */}
        {renderProgramTabContent()}

        {/* render user submitted application/requests: request for adding a mosque, eid prayer etc */}
        {renderApplicationTabContent(application)}
      </TabCollection>
      {mosqueFormVisible && (
        <ModalWrapper>
          <MosqueForm />
        </ModalWrapper>
      )}
    </section>
  );
};

export default DashboardPage;
