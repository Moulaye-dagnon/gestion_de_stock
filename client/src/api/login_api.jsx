import { api } from "./axiosConfig";

export const login_api = async (inputValue) => {
  try {
    const response = await api.post("/login", {
      email: inputValue.email,
      password: inputValue.password,
    });
    return response.data.message;
  } catch (error) {
    console.log(error);

    const errorMessage = error.response?.data?.errors
      ? error.response.data.errors.map((err) => err.msg).join(", ")
      : error.response?.data?.message
      ? error.response.data.message
      : error.response?.data?.error || error.message;
    throw new Error(errorMessage);
  }
};
