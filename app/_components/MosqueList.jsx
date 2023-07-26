"use client";
import Mosque from "./Mosque";
import { getMosques } from "../utils/api";
import { useEffect, useState } from "react";
import Badge from "./Badge";

const MosqueList = () => {
  const [mosques, setMosques] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getMosques();
      setMosques(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading mosques....</div>;
  }
  if (mosques?.length === 0) {
    return (
      <section className="text-center w-full my-5 lg:my-10">
        <p className="text-center">No mosques found</p>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="flex items-center gap-2">
        <h3>Mosques</h3> <Badge text={mosques?.length} />
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
