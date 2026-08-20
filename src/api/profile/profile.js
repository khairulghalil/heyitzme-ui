import api from "../axios";

export const getProfile = (username) => {
  return api.get(`/profile/${username}`);
};
