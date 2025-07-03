import { useQuery } from "@tanstack/react-query";
import clientApi from "../api/clientApi";
function useClient() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["client"],
    queryFn: clientApi,
  });
  return { isLoading, isError, error, data };
}

export default useClient;
