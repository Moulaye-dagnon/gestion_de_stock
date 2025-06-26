import { useQuery } from "@tanstack/react-query";
import categorieApi from "../api/categorieApi";
function useCategorie() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["categorieProduct"],
    queryFn: categorieApi,
  });
  return { isLoading, isError, error, data };
}

export default useCategorie;
