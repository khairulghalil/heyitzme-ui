import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractResponseData } from "../../utils";
import { loginApi } from "../../api/auth/auth";
import { setAuthLoading } from "./slice";
import { setToken } from "../../utils/token";

export const login = createAsyncThunk(
  "auth/login",

  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAuthLoading(true));

      const response = await loginApi(data);
      const accessToken = extractResponseData(response);

      setToken(accessToken);

      return;
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid username or password";

      return rejectWithValue(message);
    } finally {
      dispatch(setAuthLoading(false));
    }
  },
);
