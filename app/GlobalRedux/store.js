"use client";

import { configureStore } from "@reduxjs/toolkit";
import mosqueReducer from "./features/mosque/mosqueSlice";
import modalReducer from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    mosque: mosqueReducer,
    modal: modalReducer,
  },
});
