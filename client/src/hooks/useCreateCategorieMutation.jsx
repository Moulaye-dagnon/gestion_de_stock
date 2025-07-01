import { useMutation, useQueryClient } from "@tanstack/react-query";
import addCategorieApi from "../api/addCategorieApi";

function useCreateCategorieMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategorieApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorieProduct"] });
    },
  });
}

export default useCreateCategorieMutation;
