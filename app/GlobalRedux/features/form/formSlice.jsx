"use client";
const { createSlice } = require("@reduxjs/toolkit");

const formSlice = createSlice({
  name: "form",
  initialState: {
    isSuccess: false,
  },
  reducers: {
    updateFormSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
});

export const { updateFormSuccess } = formSlice.actions;
export default formSlice.reducer;
