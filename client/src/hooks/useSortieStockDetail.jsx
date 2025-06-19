import { useQuery } from "@tanstack/react-query";
import React from "react";
import SortieStockDeatil from "../api/SortieStockDeatil";

function useSortieStockDetail({ id }) {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["SortieStock", id],
    queryFn: () => SortieStockDeatil(id),
    cacheTime: 180000,
  });
  return { isLoading, isError, error, data };
}

export default useSortieStockDetail;
