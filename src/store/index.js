import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/slice";
import authReducer from "./auth/slice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
  },
});
