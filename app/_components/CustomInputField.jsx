"use client";
import { ErrorMessage, Field } from "formik";
import { styles } from "../styles";

export const CustomInputField = ({ ...props }) => {
  return (
    <div className="flex flex-col  gap-2 w-full">
      <label htmlFor={props.name}>{props.label}</label>
      <Field
        name={props.name}
        type={props.type || "text"}
        className={styles.input}
        placeholder={props.placeholder}
      />
      <ErrorMessage
        name={props.name}
        render={(msg) => <small className="error-text">{msg}</small>}
      />
    </div>
  );
};
