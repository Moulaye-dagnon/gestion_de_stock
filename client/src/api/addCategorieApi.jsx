import { api } from "./axiosConfig";

async function addCategorieApi(newCategorie) {
  try {
    const response = await api.post("/categorie/add", newCategorie);
    return response.data.message;
  } catch (error) {
    const errorMessage = error.response?.data?.errors
      ? error.response.data.errors.map((err) => err.msg).join(", ")
      : error.response?.data?.message
      ? error.response.data.message
      : error.response?.data?.error || error.message;
    throw new Error(errorMessage);
  }
}

export default addCategorieApi;
