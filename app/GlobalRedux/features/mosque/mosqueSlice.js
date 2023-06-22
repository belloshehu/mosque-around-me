"use client";

import { mosques } from "../../../data";
import { createSlice } from "@reduxjs/toolkit";

const mosqueSlice = createSlice({
  name: "mosque",
  initialState: {
    mosques: mosques,
    searchResultTitle: "",
    isLoading: false,
  },
  reducers: {
    setMosques: (state, action) => {
      state.mosques = action.payload;
    },
    setSearchResultTitle: (state, action) => {
      state.searchResultTitle = action.payload;
    },
  },
});

export const { setMosques, setSearchResultTitle } = mosqueSlice.actions;

export default mosqueSlice.reducer;
