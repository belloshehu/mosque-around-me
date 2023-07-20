"use client";
import { Suspense } from "react";
// import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
// import { authOption } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import { styles } from "../styles";
import { getMosques } from "../utils/api";
import { useSession } from "next-auth/react";

const DashboardPage = async () => {
  // redirect to this page after login
  const session = await useSession();
  const mosques = await getMosques();

  if (!session) {
    redirect("/auth/login?callbackUrl=/dashboard");
  }
  return (
    <section className="w-full min-h-screen text-center flex-1 flex flex-col gap-4 justify-start items-start">
      <h1 className="text-purple-900 text-xl lg:text-3xl font-semibold lg:font-bold">
        Dashboard
      </h1>
      <p className="p-4 py-2 bg-purple-950 text-white">{session?.user?.name}</p>
      <div className="flex flex-col lg:flex-row gap-5 justify-around w-full">
        <article className="flex flex-col gap-4 text-left  my-5 lg:my-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg border-b-4 border-slate-500 mb-4 text-purple-800">
              Mosques
            </h3>
          </div>

          <div className="grid grid-flo grid-cols-1 gap-2 p-0">
            <Suspense
              fallback={
                <div>
                  <span>loading mosques ...</span>
                </div>
              }>
              {mosques ? (
                mosques?.map((mosque) => (
                  <article key={mosque._id}>
                    <h2 className="">{mosque.name} people</h2>
                  </article>
                ))
              ) : (
                <Link
                  href={"/mosque/create"}
                  className={`${styles.buttonFluidPlain} bg-purple-950 `}>
                  Add mosque
                </Link>
              )}
            </Suspense>
          </div>
        </article>
        <div className="flex flex-col gap-4 text-left  my-5 lg:my-10">
          <h3 className="text-lg border-b-4 border-slate-500 mb-4 w-fit text-purple-800">
            Eid prayer
          </h3>
          <div>
            <Link
              href={"/eid/create"}
              className={`${styles.buttonFluidPlain} bg-purple-950 `}>
              Add Eid ground/mosque
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-left my-5 lg:my-10">
          <h3 className="text-lg border-b-4 border-slate-500 mb-4 text-purple-800">
            Admin application
          </h3>
          <div>
            <Link
              href={"/admin/mosque"}
              className={`${styles.buttonFluidPlain} bg-purple-950 `}>
              Apply for mosque admin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
