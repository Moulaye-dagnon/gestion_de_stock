import { useMutation } from "@tanstack/react-query";
import { login_api } from "../api/login_api";
import { api } from "../api/axiosConfig";
import { useNavigate } from "react-router";

function useLoginMutation({ setUser }) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login_api,
    onSuccess: async () => {
      const responseUser = await api.get("/me");
      setUser(responseUser.data);
      navigate("/");
    },
  });
}

export default useLoginMutation;
