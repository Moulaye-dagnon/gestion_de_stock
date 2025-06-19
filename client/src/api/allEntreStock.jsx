import React from "react";
import { api } from "./axiosConfig";

async function allEntreStock() {
  try {
    const response = await api.get("stock/in/all");
    return response.data.data;
  } catch (error) {
    console.log("erreur Entre stock ", error.message);
    throw new Error(`Failed to fetch EntreStock: ${error.message}`);
  }
}

export default allEntreStock;
