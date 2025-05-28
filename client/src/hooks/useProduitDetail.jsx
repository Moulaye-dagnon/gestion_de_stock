import { useQuery } from "@tanstack/react-query";
import React from "react";
import Produit_api from "../api/Produit";

function useProduitDetail({ id }) {
  const { isloading, error, data } = useQuery({
    queryKey: ["produit", id],
    queryFn: () => Produit_api(id),
  });
  return { isloading, error, data };
}

export default useProduitDetail;
