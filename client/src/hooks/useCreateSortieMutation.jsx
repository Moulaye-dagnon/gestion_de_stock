import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import addSortieStock from "../api/addSortieStock";

function useCreateSortieMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSortieStock,
    onSuccess: (newSortieStock) => {
      queryClient.invalidateQueries({ queryKey: ["SortieStocks"] });
      queryClient.invalidateQueries({
        queryKey: ["SortieStock", newSortieStock.id],
      });
      queryClient.invalidateQueries({ queryKey: ["Produits"] });
      queryClient.invalidateQueries({
        queryKey: ["Produit", newSortieStock.produitId],
      });
      queryClient.invalidateQueries({
        queryKey: ["client", newSortieStock.clientId],
      });
      queryClient.invalidateQueries({ queryKey: ["statVenteKPI"] });
      queryClient.invalidateQueries({ queryKey: ["statTopClient"] });
      queryClient.invalidateQueries({ queryKey: ["statProduitStockKPI"] });
      queryClient.invalidateQueries({ queryKey: ["statTopCategorie"] });
      queryClient.invalidateQueries({ queryKey: ["StatTopProduitSell"] });
      queryClient.invalidateQueries({ queryKey: ["statLowStock"] });
      queryClient.invalidateQueries({ queryKey: ["StatClient"] });
    },
  });
}

export default useCreateSortieMutation;
