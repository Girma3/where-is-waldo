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
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export default useCurrentUser;
