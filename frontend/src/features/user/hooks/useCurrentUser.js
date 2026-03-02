import { useQuery } from "@tanstack/react-query";

function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/currentUser", {
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
