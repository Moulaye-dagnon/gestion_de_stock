import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import addEntreStock from "../api/addEntreStock";

function useCreateEntreProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addEntreStock,
    onSuccess: (newEntreStock) => {
      queryClient.invalidateQueries({ queryKey: ["EntreStocks"] });
      queryClient.invalidateQueries({ queryKey: ["Produits"] });
      queryClient.invalidateQueries({
        queryKey: ["Produit", newEntreStock.produitId],
      });

      queryClient.invalidateQueries({ queryKey: ["statProduitStockKPI"] });
      queryClient.invalidateQueries({ queryKey: ["statTopCategorie"] });
      queryClient.invalidateQueries({ queryKey: ["EntreFournisseur"] });
      queryClient.invalidateQueries({ queryKey: ["statLowStock"] });
    },
  });
}

export default useCreateEntreProductMutation;
