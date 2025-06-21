import { useMutation } from "@tanstack/react-query";
import { login_api } from "../api/login_api";
import { api } from "../api/axiosConfig";
function useLoginMutation({ setUser }) {
  return useMutation({
    mutationFn: login_api,
    onSuccess: async () => {
      const responseUser = await api.get("/me");
      setUser(responseUser.data);
    },
  });
}

export default useLoginMutation;
