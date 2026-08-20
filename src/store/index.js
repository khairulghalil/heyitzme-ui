import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/slice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});
