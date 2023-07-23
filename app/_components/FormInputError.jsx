"use client";

const FormInputError = ({ isTouched, errorMessage }) => {
  return (
    <div>
      {isTouched && errorMessage ? (
        <small className="text-red-500">{errorMessage}</small>
      ) : null}
    </div>
  );
};

export default FormInputError;
