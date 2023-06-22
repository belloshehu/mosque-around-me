"use client";

import React from "react";
// import { mosques } from "../data";
import Mosque from "./Mosque";
import { useSelector } from "react-redux";

const MosqueList = () => {
  const { mosques } = useSelector((store) => store.mosque);
  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full my-5 lg:my-10">
      {mosques.map((mosque) => (
        <Mosque key={mosque.id} {...mosque} />
      ))}
    </section>
  );
};

export default MosqueList;
