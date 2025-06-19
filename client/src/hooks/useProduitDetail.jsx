import { useQuery } from "@tanstack/react-query";
import React from "react";
import Produit_api from "../api/Produit";

function useProduitDetail({ id }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["Produit", id],
    queryFn: () => Produit_api(id),
    cacheTime: 180000,
  });
  return { isLoading, error, data };
}

export default useProduitDetail;
