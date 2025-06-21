import React from "react";
import { api } from "./axiosConfig";

async function allSuppliers() {
  try {
    const response = await api.get("/suppliers/all");
    return response.data.data;
  } catch (error) {
    console.log("erreur produit ", error.message);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}

export default allSuppliers;
