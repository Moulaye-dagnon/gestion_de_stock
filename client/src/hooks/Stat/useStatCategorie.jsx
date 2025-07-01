import { useQuery } from "@tanstack/react-query";
import StatCategorie from "../../api/Stat/statCategorie";

function useStatCategorie() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["statCategorie"],
    queryFn: StatCategorie,
  });
  return { isLoading, isError, error, data };
}

export default useStatCategorie;
