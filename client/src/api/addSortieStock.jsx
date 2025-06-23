import { api } from "./axiosConfig";

async function addSortieStock(newSortie) {
  console.log(newSortie);

  try {
    const response = await api.post("stock/out/add", {
      produitId: newSortie.produitId,
      utilisateurId: newSortie.utilisateurId,
      quantiteSortie: newSortie.quantiteSortie,
      raison: newSortie.raison,
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

export default addSortieStock;
