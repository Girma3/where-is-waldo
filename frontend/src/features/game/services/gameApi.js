// gameRouter.get("/game/:level", startGame);
// gameRouter.post(
//   "/game/guess,
//   guessCharacterCoordinate,
// );
// gameRouter.get("/game/status/:gameId", gameStatusById);
// gameRouter.get("/game/leaderboard/:level", getLeaderboardByLevel);
// gameRouter.delete("/game/delete/:id", removeGameById);
async function startGame(level) {
  const URL = `http://localhost:4000/api/game/${level}`;

  const response = await fetch(`${URL}/game`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to start game");
  }
  return response.json();
}
async function guessCharacterCoordinate(gameId, characterId, x, y) {
  const URL = `http://localhost:4000/api/game/${gameId}/character/${characterId}`;

  const response = await fetch(`${URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ x, y }),
  });
  if (!response.ok) {
    throw new Error("Failed to guess character coordinate");
  }
  return response.json();
}
async function fetchGameStatusById(gameId) {
  const URL = `http://localhost:4000/api/game/status/${gameId}`;
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
  const URL = `http://localhost:4000/api/game/leaderboard/${level}`;
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
  const URL = `http://localhost:4000/api/game/delete/${gameId}`;
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
  startGame,
  guessCharacterCoordinate,
  fetchGameStatusById,
  fetchLeaderboardByLevel,
  removeGameById,
};
