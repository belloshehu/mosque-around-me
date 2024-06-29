import OnboardingWrapper from "../_components/onboarding/onboarding-wrapper";
import OnboardingProvider from "../context/onboarding-context";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <h1 className="font-bold text-primary text-2xl text-left w-full bg-gray-300 p-3 rounded-md">
        Onboarding
      </h1>
      {/* onboarding steps: 
        Preference, 
        ocation, 
        accoun type, 
        congratulations, 
        application/request for admin position(optional) 
      */}
      <OnboardingProvider>
        <OnboardingWrapper />
      </OnboardingProvider>
    </div>
  );
}
