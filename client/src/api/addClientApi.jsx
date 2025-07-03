import { api } from "./axiosConfig";

async function addClientApi(newSupplier) {
  try {
    const response = await api.post("/client/add", {
      nom: newSupplier.nom,
      telephone: newSupplier.telephone,
      adresse: newSupplier.adresse,
    });
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

export default addClientApi;
