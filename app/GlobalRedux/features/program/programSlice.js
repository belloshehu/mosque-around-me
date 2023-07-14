import { createSlice } from "@reduxjs/toolkit";

const programSlice = createSlice({
  name: "program",
  initialState: {
    selectedProgram: null,
  },
  reducers: {
    setSelectedProgram: (state, { payload }) => {
      state.selectedProgram = payload;
    },
    clearSelectedProgram: (state) => {
      state.selectedProgram = null;
    },
  },
});

export const { setSelectedProgram, clearSelectedProgram } =
  programSlice.actions;
export default programSlice.reducer;
