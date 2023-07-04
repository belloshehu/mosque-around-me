import React from "react";

const FormError = ({ message }) => {
  const { text, type } = message;
  return (
    <div className="my-2 flex justify-center bg-slate-100">
      {text ? (
        <p
          className={`text-center ${type ? "text-green-500" : "text-red-500"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
};

export default FormError;
