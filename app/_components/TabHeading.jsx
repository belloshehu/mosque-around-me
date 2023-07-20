"use client";

const TabHeading = ({ text, clickHandler, visible, id }) => {
  return (
    <div
      className={`${
        visible === id ? " border-b-3 bg-purple-100" : "border-neutral-50"
      } text-center text-purple-600 hover:bg-purple-100 p-2 px-3 border-b-4  duration-150 border-primary`}>
      <h3 onClick={clickHandler}>{text}</h3>
    </div>
  );
};

export default TabHeading;
