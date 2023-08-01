"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const useAddFavorite = (url, values) => {
  const [isAdding, setIsAdding] = useState(false);

  const addFavorite = async () => {
    setIsAdding(true);
    try {
      const res = await axios.post(url, values);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    } finally {
      setIsAdding(false);
    }
  };
  return [addFavorite, isAdding];
};

const useRemoveFavorite = (url, values) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const removeFavorite = async () => {
    setIsRemoving(true);
    try {
      const res = await axios.delete(url, values);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(error.message || error.data.message);
    } finally {
      setIsRemoving(false);
    }
  };
  return [removeFavorite, isRemoving];
};

export { useAddFavorite, useRemoveFavorite };
