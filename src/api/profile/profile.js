import api from "../axios";

export const getProfile = (username) => {
  return api.get(`/profile/${username}`);
};

export const updateProfile = (username, data) => {
  const { imageFile, ...profileData } = data;

  const formData = new FormData();

  formData.append("data", JSON.stringify(profileData));

  if (imageFile) {
    formData.append("image", imageFile);
  }

  return api.put(`/profile/${username}`, formData);
};
