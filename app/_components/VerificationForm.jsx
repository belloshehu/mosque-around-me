"use client";
import ReactInputVerificationCode from "react-input-verification-code";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { secondsToHours, secondsToMinutes } from "../utils/timeConverter";
import SubmitButton from "./SubmitButton";
import { FaStopwatch, FaStopwatch20 } from "react-icons/fa";
import { useRouter } from "next/navigation";

const VerificationForm = ({ form_description, form_heading, expiry }) => {
  const router = useRouter();
  const [duration, setDuration] = useState(parseInt(expiry));
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/auth/verifyemail", {
        code: value,
      });
      toast.success(data.message);
      router.push("/auth/emailVerificationSuccess");
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
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col items-center h-full w-full">
        <div className="mt-5 text-center">
          <h2
            className={`text-2xl font-bold lg:text-4xl text-center mb-5 text-primary`}>
            {form_heading}
          </h2>
          {duration > 0 ? (
            <p>{form_description}</p>
          ) : (
            <p>Code has expired. Enter your email to receive another code</p>
          )}
        </div>

        {duration > 0 ? (
          <>
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
          </>
        ) : (
          <div className="w-full my-3">
            <input
              type="email"
              name="email"
              value={""}
              placeholder="Enter your email"
              className="p-2 w-full outline-none border-primary border-b-2 bg-purple-50 shadow-inner cursor-auto"
            />
          </div>
        )}
        <div className="flex flex-col justify-center items-center w-full my-5">
          <button
            className={`${
              duration > 0
                ? "text-blue-500 bg-white"
                : "bg-purple-950 text-white"
            } underline mb-5 text-center p-3 w-full`}>
            Resend verification code
          </button>
          {duration > 0 && <SubmitButton isLoading={isLoading} />}
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;
