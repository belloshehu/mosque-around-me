"use client";
import Mosque from "./Mosque";
import { getMosques } from "../utils/api";
import { useEffect, useState } from "react";
import Badge from "./Badge";

const MosqueList = () => {
  const [mosques, setMosques] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const mosquesData = await getMosques();
    setMosques(mosquesData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading mosques....</div>;
  }
  if (!mosques) {
    <section className="text-center w-full my-5 lg:my-10">
      <p className="text-center">No mosques found</p>
    </section>;
  }

  return (
    <section className="w-full">
      <div className="flex items-center gap-2">
        <h3>Mosques</h3> <Badge text={mosques.length} />
      </div>
      <div className="grid text-center grid-cols-1 gap-4 w-full my-5 lg:my-10">
        {mosques?.map((mosque) => (
          <Mosque key={mosque._id} {...mosque} />
        ))}
      </div>
    </section>
  );
};

export default MosqueList;
