import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile as getProfileApi } from "../../api/profile/profile";
import { setProfile, setProfileLoading } from "./slice";

export { setProfile, setProfileLoading };

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (username, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setProfileLoading(true));
      const response = await getProfileApi(username);
      const profile = response.data.data.data;

      dispatch(setProfile(profile));

      return profile;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get profile",
      );
    } finally {
      dispatch(setProfileLoading(false));
    }
  },
);
