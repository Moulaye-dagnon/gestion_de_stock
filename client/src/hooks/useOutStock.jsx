import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import allSortieStock from "../api/allSortieStock";

function useOutStock() {
  const QueryClient = useQueryClient();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["SortieStocks"],
    queryFn: allSortieStock,
  });
  return { isLoading, isError, error, data };
}

export default useOutStock;
