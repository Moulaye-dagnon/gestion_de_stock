import { useQuery } from "@tanstack/react-query";
import React from "react";
import StatTopProduitSell from "../../api/Stat/statTopProduitSell";

function useStatTopProduitSell({ limit = undefined } = {}) {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["StatTopProduitSell", limit ?? "all"],
    queryFn: () => StatTopProduitSell(limit),
  });
  return { isLoading, isError, error, data };
}

export default useStatTopProduitSell;
