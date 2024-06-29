"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { memo, useEffect } from "react";
import CustomRadio from "../../CustomRadio";
import { useOnboardingContext } from "../../../context/onboarding-context";

const AccountForm = ({ defaultValue }) => {
  const { setAccount, account, increaseProgress } = useOnboardingContext();
  useEffect(() => {
    console.log("account form");
  }, []);

  return (
    <div className="w-full  md:p-10 p-5">
      <Formik
        initialValues={{
          account: account || "user",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setAccount(values.account);
          increaseProgress();
        }}
        validationSchema={Yup.object({
          account: Yup.string(),
        })}>
        <Form>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
            <CustomRadio
              name="account"
              label="User Account"
              className=""
              id="user"
              value="user"
            />
            <CustomRadio
              name="account"
              label="Mosque Admin Account"
              id="admin"
              value="admin"
            />
            <CustomRadio
              name="account"
              label="Staff Account"
              id="staff"
              value="staff"
            />
          </div>
          <button
            className="bg-primary p-2 px-4 mt-4 w-full rounded-md text-white"
            type="submit">
            Continue
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default memo(AccountForm);
