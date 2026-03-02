import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logoutUserApi } from "../services/authApi";

function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export default useLogout;
