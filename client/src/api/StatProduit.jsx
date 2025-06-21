import React from "react";
import { api } from "./axiosConfig";

async function StatProduit() {
  try {
    const response = await api.get("/stat/produit");
    return response.data.data;
  } catch (error) {
    console.log("error lors de l'appel des stat du  produit");
    throw new Error(`Failed to create new product: ${error.message}`);
  }
}

export default StatProduit;
