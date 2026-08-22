import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuthLoading } = authSlice.actions;

export default authSlice.reducer;
