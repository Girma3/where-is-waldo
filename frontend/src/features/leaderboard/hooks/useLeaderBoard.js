import { useMutation } from "@tanstack/react-query";
const URL = "http://localhost:3000/api/game/leaderboard";
function useFetchLeaderboard() {
  const url = `${URL}/:level`;
  const {
    mutateAsync: fetchLeaderboard,
    isLoading,
    error,
  } = useMutation(async ({ level }) => {
    const response = await fetch(url.replace(":level", level));
    if (!response.ok) {
      throw new Error(`Failed to get leaderboard for level ${level}`);
    }
    return response.json();
  });

  return { fetchLeaderboard, isLoading, error };
}
export default useFetchLeaderboard;
