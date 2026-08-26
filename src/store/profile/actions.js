import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractResponseData } from "../../utils";
import {
  getProfile as getProfileApi,
  updateProfile as updateProfileApi,
} from "../../api/profile/profile";
import { setProfile, setProfileLoading, setUpdProfileLoading } from "./slice";

export { setProfile, setProfileLoading, setUpdProfileLoading };

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

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ username, data, imageFile }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setUpdProfileLoading(true));

      const response = await updateProfileApi(username, { ...data, imageFile });
      const profile = extractResponseData(response);

      dispatch(setProfile(profile));

      return profile;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    } finally {
      dispatch(setUpdProfileLoading(false));
    }
  },
);
