import axios from "axios";
export const api = axios.create({
  baseURL:
    "https://4f8241f6-0741-49f7-88ab-fb1e2178aa63-00-25qf97t5eiuo7.riker.replit.dev",
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
        await axios.post(
          "https://4f8241f6-0741-49f7-88ab-fb1e2178aa63-00-25qf97t5eiuo7.riker.replit.dev/refresh",
          null,
          {
            withCredentials: true,
          }
        );
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
