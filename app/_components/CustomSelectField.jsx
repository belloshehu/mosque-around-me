import { Field, useField } from "formik";
import { styles } from "../styles";

const CustomSelectField = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="flex flex-col  gap-2 w-full">
      <label htmlFor={props.name}>{label}</label>
      <select
        {...field}
        {...props}
        className={`${styles.input} focus:border-black`}>
        {props.children}
      </select>
      {meta.error && meta.touched ? (
        <div>
          <small className="text-red-500">{meta.error}</small>
        </div>
      ) : null}
    </div>
  );
};

export default CustomSelectField;
