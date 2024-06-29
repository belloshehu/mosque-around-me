"use client";
import { Field } from "formik";
import { cn } from "../utils/api";

const CustomRadio = ({ ...props }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between w-full border-[1px] border-primary p-3 py-4 rounded-md hover:bg-gray-200",
        props.className
      )}>
      <label
        htmlFor={props.id}
        className={`${props?.lableStyle} flex justify-between items-center w-full`}>
        {props.label}
        <Field
          {...props}
          name={props.name}
          type={"radio"}
          className={`h-4 w-4 border-primary border-2 accent-primary `}
          // id={props.id}
        />
      </label>
      {props.description && (
        <small className="text-gray-400">{props.description}</small>
      )}
    </div>
  );
};

export default CustomRadio;
