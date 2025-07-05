import { useMutation, useQueryClient } from "@tanstack/react-query";
import addCategorieApi from "../api/addCategorieApi";

function useCreateCategorieMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategorieApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorieProduct"] });

      queryClient.invalidateQueries({ queryKey: ["statCategorie"] });
      queryClient.invalidateQueries({ queryKey: ["statProduitStockKPI"] });
      queryClient.invalidateQueries({ queryKey: ["statTopCategorie"] });
      queryClient.invalidateQueries({ queryKey: ["StatTopProduitSell"] });
      queryClient.invalidateQueries({ queryKey: ["statLowStock"] });
    },
  });
}

export default useCreateCategorieMutation;
