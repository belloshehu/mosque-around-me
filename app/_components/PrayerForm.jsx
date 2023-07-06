"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { styles } from "../styles";
import CustomInputField from "./CustomInputField";
import CustomSelectField from "./CustomSelectField";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import { updateFormSuccess } from "../GlobalRedux/features/form/formSlice";
import { prayers } from "../data";
import { useDispatch, useSelector } from "react-redux";

const PrayerForm = ({ mosqueId }) => {
  const { editSelectedPrayer } = useSelector((store) => store.prayer);

  const dispatch = useDispatch();
  return (
    <div className="w-full bg-white lg:w-1/3 bg-gradient-to-tr lg:border-2 lg:p-10 rounded-md">
      <Formik
        initialValues={{
          title: editSelectedPrayer?.title || "",
          iqaamaTime: editSelectedPrayer.iqaamaTime || "",
          adhaanTime: editSelectedPrayer?.adhaanTime || "",
          imamName: editSelectedPrayer.imamName || "",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // set new values using the state and country names respectively
          const newValues = { ...values, mosqueId };
          setSubmitting(true);

          if (editSelectedPrayer) {
            // update if form is opened with data in it
            axios
              .patch("/api/prayer", newValues)
              .then(() => {
                toast.success("Prayer saved successfully");
                resetForm();
                // set form success to show success message
                dispatch(updateFormSuccess(true));
              })
              .catch((error) => {
                toast.error(error.response.data || "Something went wrong");
              });
          } else {
            axios
              .post("/api/prayer", newValues)
              .then(() => {
                toast.success("Prayer added successfully");
                resetForm();
                // set form success to show success message
                dispatch(updateFormSuccess(true));
              })
              .catch((error) => {
                toast.error(error.response.data || "Something went wrong");
              });
          }
          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title required"),
          iqaamaTime: Yup.string().required("Iqaama time required"),
          adhaanTime: Yup.string().required("Adhaan time required"),
          imamName: Yup.string(),
        })}>
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
              <CustomSelectField name="title" label="Prayer title">
                <option value="">Select prayer title</option>
                {prayers.map(({ title, id }) => (
                  <option value={title} key={id}>
                    {title}
                  </option>
                ))}
              </CustomSelectField>
              <CustomInputField
                name="imamName"
                label="Imam Name"
                placeholder="Name of the Imam"
                type="text"
              />
              <CustomInputField
                name="adhaanTime"
                label="Adhaan Time"
                placeholder="Time for Adhaan"
                type="time"
              />
              <CustomInputField
                name="iqaamaTime"
                label="Iqaama Time"
                placeholder="Time for Iqaama"
                type="time"
              />
              <button
                type="submit"
                className={`${styles.buttonFluid} flex gap-2 items-center justify-center`}
                disabled={isSubmitting}>
                Submit
                {isSubmitting && (
                  <FaSpinner
                    className={`${isSubmitting ? "animate-spin" : ""}`}
                  />
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PrayerForm;
