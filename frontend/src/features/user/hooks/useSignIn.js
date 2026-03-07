import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUpUser } from "../services/authApi";
function useSignIn(onSuccessCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUpUser,
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

export default useSignIn;
