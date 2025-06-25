import axios from "axios";
export const api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true,
});

let onSetUser = () => {};

export const setSetUserHandler = (fn) => {
  onSetUser = fn;
};
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    let originalRequest = error.config;
    if (error.response?.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post("https://localhost:3000/refresh", null, {
          withCredentials: true,
        });
        return api(originalRequest);
      } catch (refreshError) {
        onSetUser(null);
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
