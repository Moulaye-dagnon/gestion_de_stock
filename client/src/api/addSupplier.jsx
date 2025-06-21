import { api } from "./axiosConfig";

async function addSupplier(newSupplier) {
  try {
    const response = await api.post("/supplier/add", {
      nom: newSupplier.nom,
      telephone: newSupplier.telephone,
      adresse: newSupplier.adresse,
    });
    return response.data.message;
  } catch (error) {
    console.log("error lors de la creation d'un nouveau founisseur");
    const errorMessage = error.response?.data?.errors
      ? error.response.data.errors.map((err) => err.msg).join(", ")
      : error.response?.data?.message || error.message;
    throw new Error(` ${errorMessage}`);
  }
}

export default addSupplier;
