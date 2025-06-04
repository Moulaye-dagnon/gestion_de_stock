import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import allSuppliers from "../api/allSuppliers";

function useSuppliers() {
  const QueryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["allSuppliers"],
    queryFn: allSuppliers,
  });
  return { isLoading, error, data };
}

export default useSuppliers;
