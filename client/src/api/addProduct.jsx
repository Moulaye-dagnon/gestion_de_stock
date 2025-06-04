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
    console.log("error lors de la creation d'un nouveau produit");
    throw new Error(`Failed to create new product: ${error.message}`);
  }
}

export default addProduct;
