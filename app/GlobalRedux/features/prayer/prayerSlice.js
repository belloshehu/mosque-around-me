"use client";
import { createSlice } from "@reduxjs/toolkit";

const prayerSlice = createSlice({
  name: "prayer",
  initialState: {
    selectedPrayer: null, // prayer to be edited when edit icon is clicked on
  },
  reducers: {
    setSelectedPrayer: (state, { payload }) => {
      state.selectedPrayer = payload;
    },
    clearSelectedPrayer: (state) => {
      state.selectedPrayer = null;
    },
  },
});

export const { setSelectedPrayer, clearSelectedPrayer } = prayerSlice.actions;
export default prayerSlice.reducer;
