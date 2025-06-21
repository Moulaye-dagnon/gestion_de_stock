import React from "react";
import { api } from "./axiosConfig";

async function UpdateProduct({ id, productData }) {
  try {
    const response = await api.put(`/produit/${id}/update`, productData);
    return response.data.produit;
  } catch (error) {
    const errorMessage = error.response?.data?.errors
      ? error.response.data.errors.map((err) => err.msg).join(", ")
      : error.response?.data?.message || error.message;
    throw new Error(errorMessage);
  }
}

export default UpdateProduct;
