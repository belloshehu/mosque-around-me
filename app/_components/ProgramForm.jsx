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
import { programNature, programTypes } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { hideForm } from "../GlobalRedux/features/modal/modalSlice";
import { clearSelectedPrayer } from "../GlobalRedux/features/prayer/prayerSlice";
import CustomTextArea from "../_components/CustomTextarea";
import { clearSelectedProgram } from "../GlobalRedux/features/program/programSlice";

const ProgramForm = ({ mosqueId }) => {
  const { selectedProgram } = useSelector((store) => store.program);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSelectedProgram());
    };
  }, []);

  return (
    <div className="overflow-y-auto max-h-[98vh] w-full bg-white lg:w-1/3 bg-gradient-to-tr lg:border-2 p-5 lg:p-10 rounded-md">
      <Formik
        initialValues={{
          title: selectedProgram?.title || "",
          startTime: selectedProgram?.startTime || "",
          stopTime: selectedProgram?.stopTime || "",
          startDate: selectedProgram?.startDate || "",
          stopDate: selectedProgram?.stopDate || "",
          description: selectedProgram?.description || "",
          virtualUrl: selectedProgram?.virtualUrl || "",
          keyPersonName: selectedProgram?.keyPersonName || "",
          additionalInfo: selectedProgram?.additionalInfo || "",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // set new values using the state and country names respectively
          const newValues = { ...values, mosqueId };
          setIsLoading(true);

          if (selectedProgram) {
            // update if form is opened with data in it
            axios
              .patch("/api/program", newValues)
              .then(() => {
                toast.success("Program saved successfully");
                dispatch(hideForm());
              })
              .catch((error) => {
                toast.error(error.response.data || "Something went wrong");
              });
          } else {
            axios
              .post("/api/program", newValues)
              .then(() => {
                toast.success("Program added successfully");
                resetForm();
                // set form success to show success message
                dispatch(hideForm("program"));
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
          startTime: Yup.string().required("Start time required"),
          stopTime: Yup.string().required("Stop time required"),
          startDate: Yup.string(),
          stopDate: Yup.string(),
          description: Yup.string().required("Description required"),
          virtualUrl: Yup.string(),
          photo: Yup.string(),
          customDate: Yup.string(),
          keyPerson: Yup.string(),
        })}>
        {({ isSubmitting }) => (
          <Form className="">
            <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
              <CustomInputField
                name="title"
                label="Title"
                placeholder="Title of the program"
                type="text"
              />
              <CustomTextArea
                name="description"
                label="Description"
                placeholder="Program"
                cols={"50"}
                rows={"30"}
              />

              <CustomSelectField name="type" label="Program type">
                <option value="" className="p-2 border-2">
                  Select program type
                </option>
                {programTypes.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </CustomSelectField>
              <CustomSelectField name="nature" label="Program nature">
                <option value="">Select nature of the program</option>
                {programNature.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </CustomSelectField>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-2 w-full">
                <CustomInputField
                  name="startTime"
                  label="Start Time"
                  placeholder="Time to start program"
                  type="time"
                />
                <CustomInputField
                  name="stopTime"
                  label="Stop Time"
                  placeholder="Time to finish"
                  type="time"
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-2 w-full">
                <CustomInputField
                  name="startDate"
                  label="Start date"
                  placeholder="Date to start the program"
                  type="date"
                />
                <CustomInputField
                  name="stopDate"
                  label="Stop date"
                  placeholder="Date to finish the program"
                  type="date"
                />
              </div>
              <CustomInputField
                name="customDate"
                label="Additional date"
                placeholder="Additional date e.g. every week, month etc."
                type="text"
              />
              <CustomInputField
                name="keyPersonName"
                label="Key person"
                placeholder="E.g. lecturer, instructor"
                type="text"
              />
              <CustomInputField
                name="virtualUrl"
                label="Virtual link"
                placeholder="Link for virtual platform, e.g. zoom"
                type="url"
              />
              <CustomTextArea
                name="additionalInfo"
                label="More information"
                placeholder="More details about the program"
                cols={"50"}
                rows={"30"}
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
                  onClick={() => dispatch(hideForm("program"))}>
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

export default ProgramForm;
