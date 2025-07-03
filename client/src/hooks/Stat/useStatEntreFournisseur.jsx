import { useQuery } from "@tanstack/react-query";
import statEntreFournisseurKPI from "../../api/Stat/statEntreFournisseurKPI";

function useStatSortieStock() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["EntreFournisseur"],
    queryFn: statEntreFournisseurKPI,
  });
  return { isLoading, isError, error, data };
}

export default useStatSortieStock;
