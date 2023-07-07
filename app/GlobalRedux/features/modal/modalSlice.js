const { createSlice } = require("@reduxjs/toolkit");

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpened: false,
    dropDownOpen: false,
    isEditFormVisible: false,
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
    showForm: (state) => {
      state.isEditFormVisible = true;
    },
    hideForm: (state) => {
      state.isEditFormVisible = false;
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
