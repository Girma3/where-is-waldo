import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUserApi } from "../services/authApi";

function useLogin(onSuccessCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUserApi,
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      queryClient.invalidateQueries(["currentUser"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export default useLogin;
