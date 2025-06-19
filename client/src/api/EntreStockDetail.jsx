import React from "react";
import { api } from "./axiosConfig";

async function EntreStockDetail(id) {
  try {
    const response = await api.get(`/stock/in/${id}/detail`);
    return response.data.data;
  } catch (error) {
    console.log("erreur EntreStock ", error.message);
    throw new Error(`Failed to fetch EntreStcok: ${error.message}`);
  }
}

export default EntreStockDetail;
