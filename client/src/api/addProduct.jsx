import React from "react";
import { api } from "./axiosConfig";

async function addProduct(newProduct) {
  try {
    const response = await api.post("/produit/new", newProduct);
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
