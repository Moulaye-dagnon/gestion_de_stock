import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("la requette original", originalRequest);

    if ((error.response?.status === 401) & !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post("http://localhost:3000/refresh", {
          withCredentials: true,
        });
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login"; // Rediriger si le rafraîchissement échoue
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
