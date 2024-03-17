"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleAdminUserApproval } from "../GlobalRedux/user/userSlice";
import { FaSpinner } from "react-icons/fa";
import { useEffect } from "react";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const { adminUsersLoading, adminUsers } = useSelector((store) => store.user);
  const approve = () => {
    dispatch(toggleAdminUserApproval(user._id));
  };

  const disApprove = () => {
    dispatch(toggleAdminUserApproval(user._id));
  };

  return (
    <div
      className={`p-2 md:p-5 ${
        user?.verified ? "bg-green-50" : "bg-red-50"
      } flex flex-col md:flex-row gap-5 items-center justify-center md:justify-start w-full rounded-md shadow-md`}>
      <Image
        src={user?.user?.photo || "/avatar.jpg"}
        alt="user"
        height={100}
        width={100}
        className="rounded-full ring-2 ring-green-400"
      />
      <div className="">
        <h3 className="font-semibold">
          {user?.user?.firstName} {user?.user?.otherName}
        </h3>
        <div className="flex flex-col gap-1 items-center md:items-start">
          <small>{user?.mosqueName}</small>
          <small>{user?.address}</small>
          <small className="bg-green-400 italic px-1 rounded-md">
            {user?.adminType}
          </small>
          <small>{user?.user?.phoneNumber}</small>
        </div>
      </div>
      {user?.verified ? (
        <button
          onClick={disApprove}
          className="justify-self-start md:justify-self-center md:place-self-start place-self-center rounded-full bg-red-600 text-sm p-2 px-5 text-white">
          {adminUsersLoading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            "Disapprove"
          )}
        </button>
      ) : (
        <button
          onClick={approve}
          className="justify-self-start md:justify-self-center md:place-self-start place-self-center rounded-full bg-purple-600 text-sm p-2 px-5 text-white">
          {adminUsersLoading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            "Approve"
          )}
        </button>
      )}
    </div>
  );
};

export default User;
