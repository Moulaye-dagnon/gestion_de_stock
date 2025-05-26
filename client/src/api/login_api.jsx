import axios from "axios";
import { api } from "./axiosConfig";

export const login_api = async ({ email, password, navigate, setUser }) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    if (response.status === 200) {
      const responseUser = await api.get("/me");
      setUser(responseUser.data);
      navigate("/");
    }
  } catch (error) {
    console.log("error server", error);
  }
};
