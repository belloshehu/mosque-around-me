"use client";

import AccountForm from "./forms/account-form";
import PreferenceForm from "./forms/preference-form";
import LocationForm from "./forms/location-form";
import OnboardingButton from "./onboarding-button";

import { memo, useEffect } from "react";
import OnboardingProgressBar from "./onboarding-progress-bar";
import Button from "../Button";
import { useOnboardingContext } from "../../context/onboarding-context";

const TOTAL_STEPS = 3;
const STEPS_TEXTS = {
  1: {
    title: "Service Preference",
    description: "Select your prefered service on mosqueConnect.",
  },
  2: {
    title: "Location",
    description: "Set your location to get services that fit you.",
  },
  3: {
    title: "Account type",
    description: "Choose account type that matches your objectives",
  },
};

const renderOnboardingForm = (progress) => {
  if (progress === 1) {
    return <PreferenceForm />;
  }
  if (progress === 2) return <LocationForm />;
  return (
    <div className="w-full flex flex-col items-center">
      <AccountForm />
    </div>
  );
};

function OnboardingWrapper() {
  const { increaseProgress, decreaseProgress, progress, account } =
    useOnboardingContext();

  const nextClick = () => {
    increaseProgress();
  };

  const backClick = () => {
    decreaseProgress();
  };

  useEffect(() => {
    console.log("rendering ");
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-4 md:w-3/5 p-5">
      <h2 className="font-semibold text-primary border-b-4 border-gray-400 rounded-md">
        {STEPS_TEXTS[progress].title}
      </h2>
      <p className="text-gray-500">{STEPS_TEXTS[progress].description}</p>
      {renderOnboardingForm(progress, account)}

      <div className="w-full flex items-center justify-between md:mx-auto my-0">
        {progress > 1 && (
          <OnboardingButton
            text={"Back"}
            after={false}
            clickHandler={backClick}
            className="mr-auto mx-8"
          />
        )}
      </div>
      <OnboardingProgressBar currentStep={progress} totalSteps={TOTAL_STEPS} />
    </div>
  );
}

export default memo(OnboardingWrapper);
