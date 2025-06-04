import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import StatProduit from "../api/StatProduit";

function useStatProduit() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["StatProduit"],
    queryFn: StatProduit,
  });

  return { isLoading, error, data };
}

export default useStatProduit;
