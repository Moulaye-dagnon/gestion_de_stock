import { useQuery } from "@tanstack/react-query";
import React from "react";
import Produit_api from "../api/Produit";

function useProduitDetail({ id }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["produit", id],
    queryFn: () => Produit_api(id),
  });
  return { isLoading, error, data };
}

export default useProduitDetail;
