import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import UpdateProduct from "../api/UpdateProduct";

function useUpdateMutation({ produitId }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productData }) =>
      UpdateProduct({ id: produitId, productData }),
    onMutate: async (productUpdated) => {
      await queryClient.cancelQueries({ queryKey: ["Produit", produitId] });

      const previousProduct = queryClient.getQueryData(["Produit", produitId]);

      queryClient.setQueryData(["Produit", produitId], (old) => ({
        ...old,
        ...productUpdated,
      }));
      return { previousProduct };
    },
    onError: (err, productUpdated, context) => {
      queryClient.setQueryData(["Produit", produitId], context.previousProduct);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["Produit", produitId] });
      queryClient.invalidateQueries({ queryKey: ["Produits"] });
      queryClient.invalidateQueries({ queryKey: ["statProduitStockKPI"] });
      queryClient.invalidateQueries({ queryKey: ["statCategorie"] });
    },
  });
}

export default useUpdateMutation;
