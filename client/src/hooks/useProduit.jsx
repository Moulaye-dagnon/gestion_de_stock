import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import allProduit_api from "../api/allProduit_api";

function useProduit() {
  const QueryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["Produits"],
    queryFn: allProduit_api,
  });
  return { isLoading, error, data };
}

export default useProduit;
