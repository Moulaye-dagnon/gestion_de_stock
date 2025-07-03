import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import addSortieStock from "../api/addSortieStock";

function useCreateSortieMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSortieStock,
    onSuccess: (newSortieStock) => {
      queryClient.invalidateQueries({ queryKey: ["SortieStocks"] });
      queryClient.invalidateQueries({ queryKey: ["Produits"] });
      queryClient.invalidateQueries({
        queryKey: ["Produit", newSortieStock.produitId],
      });
      queryClient.invalidateQueries({ queryKey: ["statVenteKPI"] });
      queryClient.invalidateQueries({ queryKey: ["statTopCategorie"] });
      queryClient.invalidateQueries({ queryKey: ["statCategorie"] });
      //   queryClient.invalidateQueries({ queryKey: ["statVenteKPI"] });
    },
  });
}

export default useCreateSortieMutation;
