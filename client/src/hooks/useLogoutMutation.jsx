import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import logoutApi from "../api/logoutApi";
import { toast } from "react-toastify";
function useLogoutMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      toast.success("Déconnexion réussie");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default useLogoutMutation;
