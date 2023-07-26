"use client";
import { Suspense, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { styles } from "../styles";
import { getMosques } from "../utils/api";
import { useSession } from "next-auth/react";
import TabCollection from "../_components/TabCollection";
import { profilePageTabsData } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "../GlobalRedux/features/modal/modalSlice";
import ModalWrapper from "../_components/ModalWrapper";
import MosqueForm from "../_components/MosqueForm";
import Mosque from "../_components/Mosque";

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

  const getData = async () => {
    const data = await getMosques();
    setMosques(data);
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
        <article className="flex flex-col gap-4 text-left  my-5 lg:my-10">
          <div className="grid grid-flo grid-cols-1 gap-2 p-0">
            <Suspense
              fallback={
                <div>
                  <span>loading mosques ...</span>
                </div>
              }>
              {mosques?.length > 0 ? (
                <ul className="">
                  {mosques?.map((mosque) => (
                    <Mosque key={mosque._id} {...mosque} />
                  ))}
                </ul>
              ) : (
                <button
                  onClick={() => dispatch(showForm("mosque"))}
                  className={`${styles.buttonFluidPlain} bg-purple-950 text-black w-fit `}>
                  Add mosque
                </button>
              )}
            </Suspense>
          </div>
        </article>
        <div className="flex flex-col gap-4 text-left  my-5 lg:my-10">
          <div>
            <Link
              href={"/eid/create"}
              className={`${styles.buttonFluidPlain} bg-purple-950 `}>
              Add Eid ground/mosque
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-left my-5 lg:my-10">
          <div>
            <Link
              href={"/admin/mosque"}
              className={`${styles.buttonFluidPlain} bg-purple-950 `}>
              Apply for mosque admin
            </Link>
          </div>
        </div>
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
