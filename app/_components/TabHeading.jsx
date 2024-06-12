"use client";

const TabHeading = ({ text, clickHandler, visible, id }) => {
  return (
    <div
      className={`${
        visible === id ? "bg-purple-100 border-primary" : "border-neutral-50"
      } text-center text-primary hover:bg-purple-100 p-2 px-3 border-b-4  duration-150 cursor-pointer`}>
      <h3 onClick={clickHandler}>{text}</h3>
    </div>
  );
};

export default TabHeading;
