import { useQuery } from "@tanstack/react-query";
import React from "react";
import EntreStockDetail from "../api/EntreStockDetail";

function useEntreStockDtail({ id }) {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["EntreStock", id],
    queryFn: () => EntreStockDetail(id),
    cacheTime: 180000,
  });
  return { isLoading, isError, error, data };
}

export default useEntreStockDtail;
