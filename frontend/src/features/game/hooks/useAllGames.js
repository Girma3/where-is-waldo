import { useQuery } from "@tanstack/react-query";
import { fetchAllGames } from "../services/gameApi";
function useAllGames() {
  return useQuery({
    queryKey: ["allGames"],
    queryFn: fetchAllGames,
  });
}

export default useAllGames;
