"use client";

import { useReducer, useContext, createContext } from "react";
import onboardingReducer from "../reducers/onboarding-reducer";

const TOTAL_STEPS = 3;

const initialState = {
  progress: 1,
  preference: {
    step: 1,
    value: "prayer",
  },
  location: {
    step: 2,
    value: {
      country: "",
      state: "",
      city: "",
    },
  },
  account: {
    step: 3,
    value: "user",
  },
};

const OnboadingContext = createContext(null);

const OnboadingProvider = ({ children }) => {
  const [onboardingState, dispatch] = useReducer(
    onboardingReducer,
    initialState
  );

  const setAccount = (accountType) => {
    dispatch({ type: "ACCOUNT", payload: accountType });
  };

  const increaseProgress = () => {
    console.log("increase");
    if (onboardingState.progress < TOTAL_STEPS) {
      dispatch({ type: "PROGRESS", payload: onboardingState.progress + 1 });
    }
  };

  const decreaseProgress = () => {
    if (onboardingState.progress > 1) {
      dispatch({ type: "PROGRESS", payload: onboardingState.progress - 1 });
    }
  };

  const setPreference = (value) => {
    dispatch({ type: "PREFERENCE", payload: value });
  };

  const setLocation = (value) => {
    dispatch({ type: "LOCATION", payload: { ...value } });
  };

  return (
    <OnboadingContext.Provider
      value={{
        ...onboardingState,
        setAccount,
        increaseProgress,
        decreaseProgress,
        setPreference,
        setLocation,
      }}>
      {children}
    </OnboadingContext.Provider>
  );
};

export const useOnboardingContext = () => useContext(OnboadingContext);

export default OnboadingProvider;
