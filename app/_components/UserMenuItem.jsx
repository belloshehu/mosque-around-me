import { FaUser } from "react-icons/fa";

const UserMenuItem = () => {
  return (
    <div className="place-self-end">
      <div className="hover:bg-purple-400 hover:scale-110 text-xl transition-slow hover:text-white text-purple-600 rounded-md p-4">
        <FaUser />
      </div>
    </div>
  );
};

export default UserMenuItem;
