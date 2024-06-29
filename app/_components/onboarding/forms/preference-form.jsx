"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { memo, useState, useEffect } from "react";
import CustomRadio from "../../CustomRadio";
import { useOnboardingContext } from "../../../context/onboarding-context";

const PreferenceForm = () => {
  const { preference, increaseProgress, setPreference, progress } =
    useOnboardingContext();

  useEffect(() => {
    console.log("preference form");
  }, []);

  return (
    <div className="w-full md:p-10 p-5">
      <Formik
        initialValues={{
          preference: preference.value || "prayer",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          setPreference(values.preference);
          increaseProgress();
        }}
        validationSchema={Yup.object({
          preference: Yup.string(),
        })}>
        <Form>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
            <CustomRadio
              name="preference"
              label="Daily Prayers"
              id="prayer"
              value="prayer"
              checked
            />
            <CustomRadio
              name="preference"
              label="Eid prayers"
              id="eid"
              value="eid"
            />
            <CustomRadio
              name="preference"
              label="Programs"
              id="programs"
              value="programs"
            />
          </div>
          <div className="flex justify-between items-center">
            {/* {progress > 1 && (
              <OnboardingButton
                text={"Back"}
                after={false}
                clickHandler={backClick}
                className="mr-auto"
              />
            )} */}
            <button
              className="bg-primary p-2 px-4 mt-4 w-full rounded-md text-white"
              type="submit">
              Continue
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default memo(PreferenceForm);
