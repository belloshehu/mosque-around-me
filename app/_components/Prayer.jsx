"use client";
import { FaPen, FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";

const Prayer = ({ prayer, user }) => {
  const { data: session } = useSession();
  const { title, adhaanTime, iqaamaTime, imamName } = prayer;
  return (
    <tr className="w-full border-2 text-black hover:bg-purple-950 hover:text-white">
      <td>{title}</td>
      <td>{adhaanTime}</td>
      <td>{iqaamaTime}</td>
      <td>{imamName}</td>
      {/* show action edit and delete buttons for admins only */}
      {session?.user.email === user.email ? (
        <>
          <td className="group relative">
            <FaPen className="cursor-pointer" />
            <span className="hover-message">edit {title}</span>
          </td>
          <td className="group relative">
            <FaTrash className="cursor-pointer" />
            <span className="hover-message">delete {title}</span>
          </td>
        </>
      ) : null}
    </tr>
  );
};

export default Prayer;
