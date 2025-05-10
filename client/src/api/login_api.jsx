import axios from "axios";
import { api } from "./axiosConfig";

export const login_api = async ({ email, password, navigate }) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    if (response.status === 200) {
      navigate("/");
    }
  } catch (error) {
    console.log("error server", error);
  }
};
