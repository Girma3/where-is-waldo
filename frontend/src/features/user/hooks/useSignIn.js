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
      // After sign up, you might want to do something like refetch the user data
      queryClient.invalidateQueries(["currentUser"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export default useSignIn;
