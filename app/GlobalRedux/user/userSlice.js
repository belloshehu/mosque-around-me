import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const toggleAdminUserApproval = createAsyncThunk(
  "adminUser/approve",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/api/admin/${userId}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.data;
    }
  }
);

export const getAdminUsers = createAsyncThunk(
  "adminUser/getUsers",
  async () => {
    try {
      const { data } = await axios.get(`/api/admin`);
      return data;
    } catch (error) {
      return error.data;
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {},
    usersLoading: false,
    adminUsers: [],
    adminUsersLoading: false,
  },
  reducers: {
    setAdminUsers: (state, { payload }) => {
      state.adminUsers = payload;
    },
    clearAdminUsers: (state) => {
      state.adminUsers = [];
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleAdminUserApproval.pending, (state, action) => {
        state.adminUsersLoading = true;
      })
      .addCase(toggleAdminUserApproval.fulfilled, (state, { payload }) => {
        state.adminUsers = state.adminUsers.map((admin) => {
          if (admin.user._id === payload.adminUser.user._id) {
            console.log("found");
            return payload.adminUser;
          }
          return admin;
        });
        state.adminUsersLoading = false;
      })
      .addCase(toggleAdminUserApproval.rejected, (state) => {
        state.adminUsersLoading = false;
      })

      // get admin users
      .addCase(getAdminUsers.pending, (state, action) => {
        state.adminUsersLoading = true;
      })
      .addCase(getAdminUsers.fulfilled, (state, { payload }) => {
        state.adminUsersLoading = false;
        state.adminUsers = payload.adminUsers;
      })
      .addCase(getAdminUsers.rejected, (state) => {
        state.adminUsersLoading = false;
      });
  },
});

export const { setAdminUsers, clearAdminUsers, setUsers, clearUsers } =
  userSlice.actions;
export default userSlice.reducer;
