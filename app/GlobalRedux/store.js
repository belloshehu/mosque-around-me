"use client";

import { configureStore } from "@reduxjs/toolkit";
import mosqueReducer from "./features/mosque/mosqueSlice";

export const store = configureStore({
  reducer: {
    mosque: mosqueReducer,
  },
});
