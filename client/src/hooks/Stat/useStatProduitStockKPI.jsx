import { useQuery } from "@tanstack/react-query";
import statProduitStockKPI from "../../api/Stat/statProduitStockKPI";

function useStatProduitStockKPI() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["statProduitStockKPI"],

    queryFn: statProduitStockKPI,
  });
  return { isLoading, isError, error, data };
}

export default useStatProduitStockKPI;
