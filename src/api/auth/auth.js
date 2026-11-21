import api from "../axios";

export const loginApi = (data) => {
  return api.post(`/auth/login`, data);
};

export const changePasswordApi = (data) => {
  return api.post(`/auth/change-password`, data);
};
