import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractResponseData } from "../../utils";
import { loginApi } from "../../api/auth/auth";
import { setUser, setAuthLoading } from "./slice";
import { setToken } from "../../utils/jwt";

export const login = createAsyncThunk(
  "auth/login",

  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAuthLoading(true));

      const response = await loginApi(data);
      const res = extractResponseData(response);

      const accessToken = res.accessToken;
      setToken(accessToken);

      return res.user;
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid username or password";

      return rejectWithValue(message);
    } finally {
      dispatch(setAuthLoading(false));
    }
  },
);
