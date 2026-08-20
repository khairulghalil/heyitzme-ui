import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
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
  },
});

export const { setProfile, setProfileLoading } = profileSlice.actions;

export default profileSlice.reducer;
