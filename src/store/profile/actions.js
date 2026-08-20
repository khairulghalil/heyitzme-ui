import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractResponseData } from "../../utils";
import { getProfile as getProfileApi } from "../../api/profile/profile";
import { setProfile, setProfileLoading } from "./slice";

export { setProfile, setProfileLoading };

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (username, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setProfileLoading(true));

      const response = await getProfileApi(username);
      const profile = extractResponseData(response);

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
