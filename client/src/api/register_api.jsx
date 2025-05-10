import { api } from "../api/axiosConfig";
export const register_api = async ({ nom, email, password, navigate }) => {
  try {
    const response = await api.post("/register", {
      nom,
      email,
      password,
    });

    if (response.status === 201) {
      navigate("/login");
    }
  } catch (error) {
    console.log("error server", error);
  }
};
