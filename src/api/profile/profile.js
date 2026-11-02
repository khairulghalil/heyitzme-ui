import api from "../axios";

export const getProfile = (username) => {
  return api.get(`/profile/${username}`);
};

export const updateProfile = (username, data) => {
  const { imageFile, bannerFile, logoFile, ...profileData } = data;

  const formData = new FormData();

  formData.append("data", JSON.stringify(profileData));

  if (imageFile) {
    formData.append("image", imageFile);
  }

  if (bannerFile) {
    formData.append("banner", bannerFile);
  }

  if (logoFile) {
    formData.append("logo", logoFile);
  }

  return api.put(`/profile/${username}`, formData);
};
