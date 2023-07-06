"use client";
import { createSlice } from "@reduxjs/toolkit";

const prayerSlice = createSlice({
  name: "prayer",
  initialState: {
    editSelectedPrayer: null, // prayer to be edited when edit icon is clicked on
  },
  reducers: {
    setEditSelectedPrayer: (state, { payload }) => {
      state.editSelectedPrayer = payload;
    },
    clearEditSelectedPrayer: (state) => {
      state.editSelectedPrayer = null;
    },
  },
});

export const { setEditSelectedPrayer, clearEditSelectedPrayer } =
  prayerSlice.actions;
export default prayerSlice.reducer;
