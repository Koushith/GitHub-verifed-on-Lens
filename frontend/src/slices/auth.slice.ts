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
    setAuthState: (state, action) => {
      state.lensHandle = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { authendicate, setAuthState } = authSlice.actions;
