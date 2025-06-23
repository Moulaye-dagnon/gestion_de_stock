import React from "react";
import { api } from "./axiosConfig";

async function addProduct(newProduct) {

  try {
    const response = await api.post("/produit/new", {
      nom: newProduct.nom,
      fournisseurId: newProduct.fournisseurId,
      categorie: newProduct.categorie,
      prixAchat: newProduct.prixAchat,
      prixVente: newProduct.prixVente,
      description: newProduct.description,
      quantite: newProduct.quantite,
      seuilApprovisionnement: newProduct.seuilApprovisionnement,
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

export default addProduct;
