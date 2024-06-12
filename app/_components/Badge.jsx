import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="ring-1 rounded-full w-10 h-10 ring-primary text-primary text-center flex items-center justify-center">
      <small className="text-xs">{text}</small>
    </div>
  );
};

export default Badge;
