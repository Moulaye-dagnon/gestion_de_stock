import React from "react";
import { api } from "./axiosConfig";

async function Produit_api(id) {
  try {
    const response = await api.get(`/produit/${id}`);
    return response.data.data;
  } catch (error) {
    console.log("erreur produit ", error.message);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}

export default Produit_api;
