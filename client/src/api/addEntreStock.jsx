import React from "react";
import { api } from "./axiosConfig";

async function addEntreStock(newEntreStock) {
  try {
    const response = await api.post("/stock/in/add", {
      produitId: newEntreStock.produitId,
      fournisseurId: newEntreStock.fournisseurId,
      utilisateurId: newEntreStock.utilisateurId,
      dateEntre: newEntreStock.dateEntre,
      quantiteEntre: newEntreStock.quantiteEntre,
      referenceCommandeLivraison: newEntreStock.referenceCommandeLivraison,
    });
    return response.data;
  } catch (error) {
    console.log("error lors de la creation d'une nouvelle EntreStock");
    throw new Error(`Failed to create new EntreStock: ${error.message}`);
  }
}

export default addEntreStock;
