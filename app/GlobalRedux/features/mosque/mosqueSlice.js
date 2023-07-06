"use client";

import { mosques } from "../../../data";
import { createSlice } from "@reduxjs/toolkit";

const mosqueSlice = createSlice({
  name: "mosque",
  initialState: {
    mosques: mosques,
    mosque: null,
    mosqueImage: "",
    searchResultTitle: "",
    isLoading: false,
  },
  reducers: {
    setMosques: (state, action) => {
      state.mosques = action.payload;
    },
    setMosque: (state, action) => {
      state.mosque = action.payload;
    },
    setMosqueImage: (state, { payload }) => {
      state.mosqueImage = payload;
    },
    setSearchResultTitle: (state, action) => {
      state.searchResultTitle = action.payload;
    },
  },
});

export const { setMosques, setSearchResultTitle, setMosqueImage, setMosque } =
  mosqueSlice.actions;

export default mosqueSlice.reducer;
