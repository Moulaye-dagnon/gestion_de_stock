import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import addProduct from "../api/addProduct";

function useCreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("allProduits");
    },
  });
}

export default useCreateProductMutation;
