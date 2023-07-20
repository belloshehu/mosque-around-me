"use client";
import Brand from "./Brand";
import { CiMenuFries } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../GlobalRedux/features/modal/modalSlice";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header
      className={`visible md:hidden w-full p-2 px-5 flex justify-between items-center bg-purple-700`}>
      <Brand />

      {/* nav link to become mosque administrator */}
      <div className="flex gap-2 p-0 items-center">
        <CiMenuFries
          className="visible inline lg:hidden text-white text-5xl cursor-pointer align-top"
          onClick={() => dispatch(toggleModal())}
        />
      </div>
    </header>
  );
};

export default Header;
