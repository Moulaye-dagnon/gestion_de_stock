import { useQuery } from "@tanstack/react-query";
import React from "react";
import StatProduit from "../api/StatProduit";

function useStatProduit() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["StatProduit"],
    queryFn: StatProduit,
    staleTime: 60 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  return { isLoading, error, data };
}

export default useStatProduit;
