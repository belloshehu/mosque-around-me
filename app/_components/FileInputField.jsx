"use client";
import { ErrorMessage, Field, useField } from "formik";
import { styles } from "../styles";

const FileInputField = ({ ...props }) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <div className="flex flex-col  gap-2 w-full">
      <label
        onClick={props.clickHandler}
        htmlFor={props.name}
        className={props?.labelStyle}>
        {props.label}
      </label>
      <Field
        name={props.name}
        type={props.type || "file"}
        className={`${styles.input} focus:border-4 hidden`}
        placeholder={props.placeholder}
      />
      <p>{meta.value}</p>
      <ErrorMessage
        name={props.name}
        render={(msg) => <small className="error-text">{msg}</small>}
      />
    </div>
  );
};

export default FileInputField;
