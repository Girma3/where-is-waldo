import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboardByLevel } from "../../game/services/gameApi";

function useFetchLeaderboard(level) {
  const queryKey = ["leaderboard", level];

  const queryFn = () => fetchLeaderboardByLevel(level);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled: !!level, // Only run the query if level is provided
  });

  return { data, error, isLoading, refetch };
}
export default useFetchLeaderboard;
