import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEligible: false,
  lensProfile: {},
  isAuthendicated: false,
  isVerified: false,
  gitHubUserName: "",
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
    setVerified: (state, action) => {
      state.isVerified = action.payload;
    },
    setGithub: (state, action) => {
      state.gitHubUserName = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { authendicate, setAuthState, setVerified, setGithub } =
  authSlice.actions;
