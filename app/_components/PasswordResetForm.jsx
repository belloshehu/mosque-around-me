"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Link from "next/link";
import CodeExpired from "./CodeExpired";
import Timer from "./Timer";
import { toast } from "react-hot-toast";
import axios from "axios";
import CustomInputField from "./CustomInputField";
import ReactInputVerificationCode from "react-input-verification-code";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubmitButton from "./SubmitButton";

const PasswordResetForm = ({
  expiry,
  form_heading,
  form_description,
  verificationType,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [duration, setDuration] = useState(parseInt(expiry));
  return (
    <div className="w-full lg:w-1/3 bg-gradient-to-tr">
      {duration > 0 ? (
        <Formik
          initialValues={{
            code: "",
            password: "",
            passwordRepeat: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if (!code) {
              toast.error("Enter verification code");
              return;
            }
            if (code.length < 6) {
              toast.error("Incomplete verification code");
              return;
            }
            try {
              setIsLoading(true);
              const { data } = await axios.post("/api/auth/passwordreset", {
                password: values.password,
                code,
              });
              toast.success(data.message);
              router.push(`/auth/verificationsuccess/${verificationType}`);
            } catch (error) {
              toast.error(error?.response?.data || "Something went wrong");
            } finally {
              setIsLoading(false);
            }
          }}
          validationSchema={Yup.object({
            code: Yup.string(),
            password: Yup.string()
              .min(8, "Must be at least 8 characters")
              .required("Password required")
              .matches(/[a-z]+/, "Must contain atleast one lowercase character")
              // .matches(/[A-Z]+/, "One uppercase character")
              // .matches(/[@$!%*#?&]+/, "One special character")
              .matches(/\d+/, "Must contain atleast one number"),
            passwordRepeat: Yup.string()
              .required("Confirm password required")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
            //   terms: Yup.string().required("You must accept the terms to proceed"),
          })}>
          {({ getFieldProps, setFieldValue }) => (
            <Form>
              <div className="flex flex-col items-center justify-center gap-2 md:gap-2 w-full">
                <div className="mt-5 text-center">
                  <h2
                    className={`text-2xl font-bold lg:text-4xl text-center mb-5 text-primary`}>
                    {form_heading}
                  </h2>
                  <p>{form_description}</p>
                </div>

                <section className="verification-form-body gap-2">
                  <Timer duration={duration} setDuration={setDuration} />
                  <div className="custom-styles">
                    <ReactInputVerificationCode
                      length={6}
                      type="text"
                      placeholder=""
                      name="code"
                      code={code}
                      onChange={setCode}
                    />
                  </div>
                  <CustomInputField
                    name="password"
                    label=""
                    placeholder="Password"
                    type="password"
                  />
                  <CustomInputField
                    name="passwordRepeat"
                    label=""
                    placeholder="Password repeat"
                    type="password"
                  />

                  <div className="text-center my-4">
                    <Link
                      href={`/auth/verificationCode/${verificationType}`}
                      className="text-blue-600 underline">
                      Resend verification code
                    </Link>
                  </div>
                  <SubmitButton isLoading={isLoading} />
                </section>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <CodeExpired verificationType={verificationType} />
      )}
    </div>
  );
};

export default PasswordResetForm;
