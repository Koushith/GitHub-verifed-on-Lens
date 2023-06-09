//@ts-nocheck

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  // put all reducer here
  reducer: {
    test: "hii",
  },
});
