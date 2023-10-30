import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    currentUser: "No User",
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
    },
    loginFailture: (state) => {
      state.error = false;
      state.isFetching = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailture } = userSlice.actions;

export default userSlice.reducer;
