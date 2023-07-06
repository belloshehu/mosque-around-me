"use client";
import React from "react";

import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { hideForm } from "../GlobalRedux/features/modal/modalSlice";

const ModalWrapper = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-black bg-opacity-80 z-20 w-full min-h-screen fixed top-0 left-0 shadow-[0_35px_60px_1000px_rgba(0,0,0,0.8)] p-auto flex flex-col items-center justify-center">
      <LiaTimesSolid
        className="text-white absolute z-20 top-2 right-2 text-3xl"
        onClick={() => dispatch(hideForm())}
      />
      {children}
    </div>
  );
};

export default ModalWrapper;
