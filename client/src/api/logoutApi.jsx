import { api } from "./axiosConfig";
async function logoutApi() {
  try {
    const response = await api.post("/logout");
    return response.data; 
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;
    throw new Error(errorMessage);
  }
}

export default logoutApi;
