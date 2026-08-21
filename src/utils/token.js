const TOKEN_KEY = "heyitzme_access_token";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getTokenPayload = () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenExpired = () => {
  const token = getToken();
  if (!token) {
    return true;
  }

  try {
    const payload = JSON.parse(atob(token));

    return payload.expiresAt * 1000 <= Date.now();
  } catch {
    return true;
  }
};

export const isAuthenticated = (user) => {
  const payload = getTokenPayload();
  if (payload && payload.user !== user) {
    return false;
  }

  return !!getToken() && !isTokenExpired();
};
