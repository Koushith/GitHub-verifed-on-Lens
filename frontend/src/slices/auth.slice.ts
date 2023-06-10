import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEligible: false,
  lensHandle: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authendicate: (state, action) => {},
  },
});

export const authReducer = authSlice.reducer;
export const { authendicate } = authSlice.actions;
