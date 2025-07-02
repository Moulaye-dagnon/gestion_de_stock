import { useQuery } from "@tanstack/react-query";
import StatTopCategorie from "../../api/Stat/statTopCategorie";

function useStatTopCategorie({ limit = undefined } = {}) {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["statTopCategorie", limit ?? "all"],
    queryFn: () => StatTopCategorie(limit),
  });
  return { isLoading, isError, error, data };
}

export default useStatTopCategorie;
