import { useQuery } from "@tanstack/react-query";
import React from "react";
import allProduit_api from "../api/allProduit_api";

function useProduit() {
  const { isloading, error, data } = useQuery({
    queryKey: ["allProduits"],
    queryFn: allProduit_api,
  });
  return { isloading, error, data };
}

export default useProduit;
