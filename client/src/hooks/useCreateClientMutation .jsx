import { useMutation, useQueryClient } from "@tanstack/react-query";
import addClientApi from "../api/addClientApi";

function useCreateClientMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addClientApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client"] });
      queryClient.invalidateQueries({ queryKey: ["StatClient"] });

      queryClient.invalidateQueries({ queryKey: ["statTopClient"] });
      queryClient.invalidateQueries({ queryKey: ["StatClient"] });
      queryClient.invalidateQueries({ queryKey: ["statVenteKPI"] });
    },
  });
}

export default useCreateClientMutation;
