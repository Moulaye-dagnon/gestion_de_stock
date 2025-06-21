import React from "react";
import { api } from "./axiosConfig";

async function SortieStockDeatil(id) {
  try {
    const response = await api.get(`/stock/out/${id}/detail`);
    return response.data.data;
  } catch (error) {
    console.log("erreur SortieStock ", error.message);
    throw new Error(`Failed to fetch SorteStcok: ${error.message}`);
  }
}

export default SortieStockDeatil;
