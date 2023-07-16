"use client";
const { createSlice } = require("@reduxjs/toolkit");

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpened: false,
    dropDownOpen: false,
    prayerFormVisible: false,
    programFormVisible: false,
    confirmDelete: false,
  },
  reducers: {
    openModal: (state) => {
      state.isOpened = true;
    },
    closeModal: (state) => {
      state.isOpened = false;
    },
    toggleDropdown: (state) => {
      if (state.dropDownOpen) {
        state.dropDownOpen = false;
      } else {
        state.dropDownOpen = true;
      }
    },
    showForm: (state, { payload }) => {
      if (payload === "prayer") {
        state.prayerFormVisible = true;
      } else if (payload === "program") {
        state.programFormVisible = true;
      }
    },
    hideForm: (state, { payload }) => {
      if (payload === "prayer") {
        state.prayerFormVisible = false;
      } else if (payload === "program") {
        state.programFormVisible = false;
      } else {
        state.prayerFormVisible = false;
        state.programFormVisible = false;
      }
    },
    showConfirmDelete: (state) => {
      state.confirmDelete = true;
    },
    hideConfirmDelete: (state) => {
      state.confirmDelete = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  toggleDropdown,
  showForm,
  hideForm,
  showConfirmDelete,
  hideConfirmDelete,
} = modalSlice.actions;
export default modalSlice.reducer;
