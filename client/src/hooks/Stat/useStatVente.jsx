import { useQuery } from "@tanstack/react-query";
import statVenteKPI from "../../api/Stat/statVenteKPI";

function useStatVente() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["statVenteKPI"],
    queryFn: statVenteKPI,
  });
  return { isLoading, isError, error, data };
}

export default useStatVente;
