import React from "react";
import { api } from "./axiosConfig";

async function addEntreStock(newEntreStock) {
  try {
    const response = await api.post("/stock/in/add", newEntreStock);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.errors
      ? error.response.data.errors.map((err) => err.msg).join(", ")
      : error.response?.data?.message
      ? error.response.data.message
      : error.response?.data?.error || error.message;
    throw new Error(errorMessage);
  }
}

export default addEntreStock;
