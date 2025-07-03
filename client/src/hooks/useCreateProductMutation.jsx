import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import addProduct from "../api/addProduct";

function useCreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Produits"] });
      queryClient.invalidateQueries({ queryKey: ["statProduitStockKPI"] });
      queryClient.invalidateQueries({ queryKey: ["statCategorie"] });
      queryClient.invalidateQueries({ queryKey: ["statTopCategorie"] });
      queryClient.invalidateQueries({ queryKey: ["statVenteKPI"] });
    },
  });
}

export default useCreateProductMutation;
