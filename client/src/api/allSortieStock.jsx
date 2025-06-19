import React from "react";
import { api } from "./axiosConfig";

async function allSortieStock() {
  try {
    const response = await api.get("stock/out/all");
    return response.data.data;
  } catch (error) {
    console.log("erreur Sortie stock ", error.message);
    throw new Error(`Failed to fetch SortieStock: ${error.message}`);
  }
}

export default allSortieStock;
