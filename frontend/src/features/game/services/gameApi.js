const apiUrl = import.meta.env.VITE_API_URL;

async function fetchAllGames() {
  const res = await fetch(`${apiUrl}/api/game`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch game");
  }
  return res.json();
}

async function playGame({ level }) {
  const url = `${apiUrl}/api/game/${level}`;

  const response = await fetch(`${url}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to start game for level ${level}`);
  }

  return response.json();
}
async function guessCharacterCoordinate(gameId, characterId, x, y) {
  const URL = `${apiUrl}/api/game/${gameId}/character/${characterId}`;

  const response = await fetch(`${URL}`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ x, y }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to guess character coordinate");
  }
  return response.json();
}
async function fetchGameStatusById(gameId) {
  const URL = `${apiUrl}/api/game/status/${gameId}`;
  const response = await fetch(`${URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch game status");
  }
  return response.json();
}
async function fetchLeaderboardByLevel(level) {
  const URL = `${apiUrl}/api/game/leaderboard/${level}`;
  const response = await fetch(`${URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard");
  }
  return response.json();
}
async function removeGameById(gameId) {
  const URL = `${apiUrl}/api/game/delete/${gameId}`;
  const response = await fetch(`${URL}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to remove game");
  }
  return response.json();
}
export {
  fetchAllGames,
  playGame,
  guessCharacterCoordinate,
  fetchGameStatusById,
  fetchLeaderboardByLevel,
  removeGameById,
};
