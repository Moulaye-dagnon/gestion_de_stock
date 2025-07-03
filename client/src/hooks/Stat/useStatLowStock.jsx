import { useQuery } from "@tanstack/react-query";
import StatLowStock from "../../api/Stat/statLowStock";

function useStatLowStock({ limit = undefined } = {}) {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["statLowStock", limit ?? "all"],
    queryFn: () => StatLowStock(limit),
  });
  return { isLoading, isError, error, data };
}

export default useStatLowStock;
