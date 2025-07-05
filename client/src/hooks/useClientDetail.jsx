import React from "react";
import ClientDetail from "../api/ClientDetail";
import { useQuery } from "@tanstack/react-query";

function useClientDetail({ clientId }) {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => ClientDetail(clientId),
  });
  return { isLoading, isError, error, data };
}

export default useClientDetail;
