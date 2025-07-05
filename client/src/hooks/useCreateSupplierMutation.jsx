import { useMutation, useQueryClient } from "@tanstack/react-query";
import addSupplier from "../api/addSupplier";

function useCreateSupplierMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Suppliers"] });

      queryClient.invalidateQueries({ queryKey: ["statProduitStockKPI"] });
      queryClient.invalidateQueries({ queryKey: ["EntreFournisseur"] });
      queryClient.invalidateQueries({ queryKey: ["statLowStock"] });
    },
  });
}

export default useCreateSupplierMutation;
