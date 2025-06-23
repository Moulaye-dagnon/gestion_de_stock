import React from "react";
import { api } from "./axiosConfig";

async function EntreStockDetail(id) {
  try {
    const response = await api.get(`/stock/in/${id}/detail`);
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

export default EntreStockDetail;
