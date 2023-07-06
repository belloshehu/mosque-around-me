"use client";

import { configureStore } from "@reduxjs/toolkit";
import mosqueReducer from "./features/mosque/mosqueSlice";
import modalReducer from "./features/modal/modalSlice";
import formReducer from "./features/form/formSlice";
import prayerReducer from "./features/prayer/prayerSlice";

export const store = configureStore({
  reducer: {
    mosque: mosqueReducer,
    modal: modalReducer,
    form: formReducer,
    prayer: prayerReducer,
  },
});
