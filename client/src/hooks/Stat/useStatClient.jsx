import { useQuery } from "@tanstack/react-query";
import StatClient from "../../api/Stat/statClient";

function useStatClient() {
   const { isLoading, isError, error, data } = useQuery({
    queryKey: ["categorieProduct"],
    queryFn: StatClient,
  });
  return { isLoading, isError, error, data };
}

export default useStatClient