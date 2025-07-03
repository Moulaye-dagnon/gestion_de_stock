import { useMutation, useQueryClient } from "@tanstack/react-query";
import addSupplier from "../api/addSupplier";

function useCreateSupplierMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Suppliers"] });
      queryClient.invalidateQueries({ queryKey: ["EntreFournisseur"] });
      queryClient.invalidateQueries({ queryKey: ["Suppliers"] });
    },
  });
}

export default useCreateSupplierMutation;
