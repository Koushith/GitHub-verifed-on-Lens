import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEligible: false,
  lensProfile: {},
  isAuthendicated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authendicate: (state, action) => {
      console.log("action firing while no account", action);
      state.isEligible = action.payload;
    },
    setAuthState: (state, action) => {
      state.lensProfile = action.payload;
      state.isAuthendicated = true;
      state.isEligible = true;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { authendicate, setAuthState } = authSlice.actions;
