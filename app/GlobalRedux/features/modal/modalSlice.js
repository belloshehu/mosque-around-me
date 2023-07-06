const { createSlice } = require("@reduxjs/toolkit");

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpened: false,
    dropDownOpen: false,
    isFormVisible: false,
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
    showForm: (state) => {
      state.isFormVisible = true;
    },
    hideForm: (state) => {
      state.isFormVisible = false;
    },
  },
});

export const { openModal, closeModal, toggleDropdown, showForm, hideForm } =
  modalSlice.actions;
export default modalSlice.reducer;
