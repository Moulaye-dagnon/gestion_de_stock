import { useQuery } from "@tanstack/react-query";
import React from "react";
import supplierDetail from "../api/supplierDetail";

function useSupplierDetail({ id }) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["Supplier", id],
    queryFn: () => supplierDetail(id),
  });
  return { isLoading, isError, error, data };
}

export default useSupplierDetail;
