import React from "react";
import { api } from "./axiosConfig";

async function supplierDetail(id) {
  try {
    const response = await api.get(`/supplier/${id}/detail`);
    return response.data.data;
  } catch (error) {
    console.log("error supplier", error);
    throw new Error(`Failed to fetch supplier detail: ${error.message}`);
  }
}

export default supplierDetail;
