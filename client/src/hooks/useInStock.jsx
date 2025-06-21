import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import allEntreStock from "../api/allEntreStock";

function useInStock() {
  const QueryClient = useQueryClient();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["EntreStocks"],
    queryFn: allEntreStock,
  });
  return { isLoading, isError, error, data };
}

export default useInStock;
