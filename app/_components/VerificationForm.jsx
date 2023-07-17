"use client";
import ReactInputVerificationCode from "react-input-verification-code";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { secondsToHours, secondsToMinutes } from "../utils/timeConverter";
import SubmitButton from "./SubmitButton";
import { FaStopwatch, FaStopwatch20 } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const VerificationForm = ({
  form_description,
  form_heading,
  expiry,
  verificationType,
}) => {
  const router = useRouter();
  const [duration, setDuration] = useState(expiry);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) {
      toast.error("Enter verification code");
      return;
    }
    if (value.length < 6) {
      toast.error("Incomplete verification code");
      return;
    }
    try {
      setIsLoading(true);

      let res = null;
      if (verificationType === "email") {
        res = await axios.post("/api/auth/verifyemail", {
          code: value,
        });
      } else {
        res = await axios.post("/api/auth/resetpassword", {
          code: value,
        });
      }
      const { data } = res;
      toast.success(data.message);
      router.push(`/auth/verificationsuccess/${verificationType}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer = null;
    if (duration > 0) {
      timer = setInterval(() => {
        setDuration((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [duration]);

  return (
    <div className="w-full lg:w-1/3">
      {duration > 0 ? (
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col items-center h-full w-full">
          <div className="mt-5 text-center">
            <h2
              className={`text-2xl font-bold lg:text-4xl text-center mb-5 text-primary`}>
              {form_heading}
            </h2>
            <p>{form_description}</p>
          </div>
          <section className="verification-form-body">
            <div className="rounded-md text-center mb-4 p-3 w-full">
              <div className="flex justify-between items-center bg-purple-200 border-2 p-2 rounded-md">
                <small className="text-purple">Code expires in:</small>
                <h3 className="text-sm text-center">
                  {secondsToHours(duration)}{" "}
                  <span className="text-slate-600">hours</span> :{" "}
                  {secondsToMinutes(duration)}{" "}
                  <span className="text-slate-600">mins</span> : {duration % 60}{" "}
                  <span className="text-slate-600">secs</span>
                </h3>
                <FaStopwatch className="text-green-600 text-lg animate-ping" />
              </div>
            </div>
            <div className="custom-styles">
              <ReactInputVerificationCode
                length={6}
                type="text"
                placeholder=""
                value={value}
                onChange={setValue}
              />
            </div>

            <div className="text-center my-4">
              <Link
                href={`/auth/verificationCode/${verificationType}`}
                className="text-blue-600 underline">
                Resend verification code
              </Link>
            </div>
            <SubmitButton isLoading={isLoading} />
          </section>
        </form>
      ) : (
        <section className="verification-form-body gap-5">
          <p>Verification code has expired</p>
          <Link
            href={`/auth/verificationCode/${verificationType}`}
            className="bg-primary text-white p-3">
            Resend verification code
          </Link>
        </section>
      )}
    </div>
  );
};

export default VerificationForm;
