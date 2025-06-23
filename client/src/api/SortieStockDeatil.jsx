import React from "react";
import { api } from "./axiosConfig";

async function SortieStockDeatil(id) {
  try {
    const response = await api.get(`/stock/out/${id}/detail`);
    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.errors
      ? error.response.data.errors.map((err) => err.msg).join(", ")
      : error.response?.data?.message
      ? error.response.data.message
      : error.response?.data?.error || error.message;
    throw new Error(errorMessage);
  }
}

export default SortieStockDeatil;
