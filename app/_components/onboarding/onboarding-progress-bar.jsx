"use client";

import { memo } from "react";
import { cn } from "../../utils/api";

function ProgressBarStep({ isActive }) {
  return (
    <div
      className={cn("border-4 border-gray-300 rounded-md w-full", {
        "border-primary": isActive,
      })}
    />
  );
}

const OnboardingProgressBar = ({ currentStep, totalSteps, className = "" }) => {
  const steps = Array(totalSteps).fill(0);
  return (
    <div className={cn("w-1/3 mx-auto flex items-center gap-3", className)}>
      {steps.map((_, index) => (
        <ProgressBarStep key={index} isActive={currentStep === index + 1} />
      ))}
    </div>
  );
};

export default memo(OnboardingProgressBar);
