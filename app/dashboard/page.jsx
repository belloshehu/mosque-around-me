import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOption } from "../api/auth/[...nextauth]/route";
import axios from "axios";
import Link from "next/link";
import { styles } from "../styles";

const getApplication = async () => {
  const response = await axios.get("/api/admin");
};

const DashboardPage = async () => {
  // redirect to this page after login

  const session = await getServerSession(authOption);

  if (!session) {
    redirect("/auth/login?callbackUrl=/dashboard");
  }
  return (
    <section className="w-full min-h-full text-center flex-1 flex flex-col gap-4 justify-start items-start">
      <h1 className="text-purple-900 text-xl lg:text-3xl font-semibold lg:font-bold">
        Dashboard
      </h1>
      <div className="flex flex-col gap-4 text-left">
        <h3 className="text-lg border-b-2 border-slate-500 mb-4">Mosques</h3>
        <div>
          <Link href={"/mosque/form"} className={styles.buttonFluid}>
            Add mosque
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-left">
        <h3 className="text-lg border-b-2 border-slate-500 mb-4 w-fit">
          Eid prayer
        </h3>
        <div>
          <Link href={"/eid/create"} className={styles.buttonFluid}>
            Add Eid ground/mosque
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-left">
        <h3 className="text-lg border-b-2 border-slate-500 mb-4">
          Admin application
        </h3>
        <div>
          <Link href={"/admin/mosque"} className={styles.buttonFluid}>
            Apply for mosque admin
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
