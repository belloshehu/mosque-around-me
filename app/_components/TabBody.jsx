"use client";

const TabBody = ({ id, children, visible }) => {
  console.log(id, children, visible);
  if (visible !== id) return null;
  return <div className="w-full flex flex-col space-y-3">{children}</div>;
};

export default TabBody;
