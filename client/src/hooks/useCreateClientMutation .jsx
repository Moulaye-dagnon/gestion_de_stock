import { useMutation, useQueryClient } from "@tanstack/react-query";
import addClientApi from "../api/addClientApi";

function useCreateClientMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addClientApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Suppliers"] });
    },
  });
}

export default useCreateClientMutation;
