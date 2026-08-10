import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";
const API_BASE_URL = rawBaseUrl.endsWith("/") ? rawBaseUrl : `${rawBaseUrl}/`;
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se erro 401 e não é uma tentativa de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) {
          // Se não há refresh token, redireciona para login
          localStorage.removeItem("access");
          localStorage.removeItem("user");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const refreshUrl = `${API_BASE_URL.replace(/\/$/, "")}/token/refresh/`;

        // Tenta fazer refresh
        const response = await axios.post(refreshUrl, { refresh: refreshToken });

        const { access } = response.data;
        localStorage.setItem("access", access);
        originalRequest.headers.Authorization = `Bearer ${access}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Se refresh falha, redireciona para login
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;