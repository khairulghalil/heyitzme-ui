import api from "../axios";

export const getProfile = (username) => {
  return api.get(`/profile/${username}`);
};

export const updateProfile = (username, data) => {
  return api.put(`/profile/${username}`, data);
};
