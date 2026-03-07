import { useQuery } from "@tanstack/react-query";
const apiUrl = import.meta.env.VITE_API_URL;

function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/api/currentUser`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch current user");
      }
      return res.json();
    },

    //refetch on mount and store it in cache
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });
}

export default useCurrentUser;
