import { useQuery } from "@tanstack/react-query";
import React from "react";
import StatTopClient from "../../api/Stat/statTopClient";

function useStatTopClient({ limit = undefined } = {}) {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["statTopClient", limit ?? "all"],
    queryFn: () => StatTopClient(limit),
  });
  return { isLoading, isError, error, data };
}

export default useStatTopClient;
