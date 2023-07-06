"use client";
import Mosque from "./Mosque";
import { getMosques } from "../utils/api";

const MosqueList = async () => {
  const mosques = await getMosques();
  console.log(mosques);
  if (!mosques) {
    <section className="text-center w-full my-5 lg:my-10">
      <p className="text-center">No mosques found</p>
    </section>;
  }

  return (
    <section className="grid text-center grid-cols-1 lg:grid-cols-4 gap-4 w-full my-5 lg:my-10">
      {mosques?.map((mosque) => (
        <Mosque key={mosque._id} {...mosque} />
      ))}
    </section>
  );
};

export default MosqueList;
