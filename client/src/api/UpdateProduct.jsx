import React from "react";
import { api } from "./axiosConfig";

async function UpdateProduct({ id, productData }) {
  try {
    const response = await api.put(`/produit/${id}/update`, productData);
    return response.data.produit;
  } catch (error) {
    console.log("error lors de la mis a jour du produit", error);
    throw new Error(`Failed to update product: ${error.message}`);
  }
}

export default UpdateProduct;
