import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  updLoading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.data = action.payload;
    },
    setProfileLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUpdProfileLoading: (state, action) => {
      state.updLoading = action.payload;
    },
  },
});

export const { setProfile, setProfileLoading, setUpdProfileLoading } =
  profileSlice.actions;

export default profileSlice.reducer;
