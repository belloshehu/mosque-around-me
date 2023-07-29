"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Mosque from "./Mosque";
import { toast } from "react-hot-toast";

const FavoriteMosques = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mosques, setMosques] = useState([]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/favorites/mosque", {
        next: {
          invalidate: "0",
        },
      });
      setMosques(data.favoriteMosques);
      console.log(data);
    } catch (error) {
      toast.error(error.data.message);
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
        <p className="text-center">No favorite mosques</p>
      </section>
    );
  }
  return (
    <section className="w-full">
      {mosques?.map((mosque) => (
        <Mosque key={mosque._id} {...mosque} />
      ))}
    </section>
  );
};

export default FavoriteMosques;
