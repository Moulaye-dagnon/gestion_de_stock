import React from "react";
import { api } from "./axiosConfig";

async function allProduit_api() {
  try {
    const response = await api.get("/produit/all");
    return response.data.data;
  } catch (error) {
    console.log("erreur produit ", error.message);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}

export default allProduit_api;
