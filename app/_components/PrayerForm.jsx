"use client";
import { useState, useEffect } from "react";
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
import { hideForm } from "../GlobalRedux/features/modal/modalSlice";
import { clearSelectedPrayer } from "../GlobalRedux/features/prayer/prayerSlice";

const PrayerForm = ({ mosqueId }) => {
  const { selectedPrayer } = useSelector((store) => store.prayer);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSelectedPrayer());
    };
  }, []);

  return (
    <div className="w-full bg-white lg:w-1/3 bg-gradient-to-tr lg:border-2 p-5 lg:p-10 rounded-md">
      <Formik
        initialValues={{
          title: selectedPrayer?.title || "",
          iqaamaTime: selectedPrayer?.iqaamaTime || "",
          adhaanTime: selectedPrayer?.adhaanTime || "",
          imamName: selectedPrayer?.imamName || "",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // set new values using the state and country names respectively
          const newValues = { ...values, mosqueId };
          setIsLoading(true);

          if (selectedPrayer) {
            // update if form is opened with data in it
            axios
              .patch("/api/prayer", newValues)
              .then(() => {
                toast.success("Prayer saved successfully");
                dispatch(hideForm("prayer"));
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
          dispatch(clearSelectedPrayer());
          setIsLoading(false);
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
              <div className="flex justify-between w-full gap-10">
                <button
                  type="submit"
                  className={`${styles.buttonFluidPlain} bg-purple-950 flex gap-2 items-center justify-center w-1/2`}
                  disabled={isLoading}>
                  Submit
                  {isLoading && (
                    <FaSpinner
                      className={`${isLoading ? "animate-spin" : ""}`}
                    />
                  )}
                </button>
                <button
                  type="button"
                  className={`${styles.buttonFluidPlain} bg-slate-400 text-black w-1/2`}
                  onClick={() => dispatch(hideForm("prayer"))}>
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PrayerForm;
