import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    let originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log(originalRequest._retry);
      try {
        await axios.post("http://localhost:3000/refresh", null, {
          withCredentials: true,
        });
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    } else if (error.response?.status === 403) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
