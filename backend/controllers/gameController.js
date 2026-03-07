import {
  createGame,
  updateLeaderboard,
  deleteGameById,
  getCharacterById,
  updateCharacterFoundStatus,
  updateGameStatus,
  getGameById,
  getGameByLevel,
  getLeaderboard,
} from "../db/gameQueries.js";
import { getUserById } from "../db/userQueries.js";
import fs from "fs";

const allGames = JSON.parse(fs.readFileSync("./db/gameData.json", "utf8"));
async function showAllGames(req, res) {
  if (!allGames || !allGames.games) {
    return res.status(404).json({ error: "No games data found" });
  }
  try {
    return res.status(200).json({ ...allGames });
  } catch (error) {
    console.error("Error showing all games:", error);
    return res.status(500).json({ error: "Failed to show all games" });
  }
}
async function startGame(req, res) {
  const userId = Number(req.user.id) || req.user.id;
  let level = req.params.level;
  level = Number(level);

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized user can't start game." });
  }

  // load level from JSON
  const levelData = allGames.games.find((l) => l.level === level);

  if (
    !levelData ||
    !levelData.characters ||
    levelData.characters.length === 0
  ) {
    return res.status(404).json({ error: "Level not found" });
  }
  try {
    const isGameExist = await getGameByLevel(level, userId);
    const leaderboard = await getLeaderboard(level);

    if (isGameExist) {
      return res.status(200).json(isGameExist, { leaderboard });
    }
    const newGame = await createGame(
      userId,
      levelData.level,
      levelData.image,
      levelData.characters,
    );
    return res.status(200).json(newGame, { leaderboard });
  } catch (error) {
    console.error("Error starting game:", error);
    return res.status(500).json({ error: "Failed to start game" });
  }
}
//guess character coordinates
async function guessCharacterCoordinate(req, res) {
  const { characterId } = req.params;
  const { x, y } = req.body;
  const userId = Number(req.user.id) || req.user.id;

  if (!characterId || x === undefined || y === undefined) {
    return res
      .status(400)
      .json({ error: "Missing required parameters characterId, x, y" });
  }

  try {
    const character = await getCharacterById(Number(characterId));
    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }
    const isCorrect = character.correctX === x && character.correctY === y;

    if (isCorrect) {
      const updateCharacter = await updateCharacterFoundStatus(
        Number(characterId),
        isCorrect,
      );
      // delegate game progression logic
      const user = await getUserById(userId);
      const gameSession = await gameSessionController(
        updateCharacter.gameId,
        isCorrect,
        user.name,
      );

      // includes currentGame, nextGame, isGameEnded
      return res.status(200).json({ isCorrect, ...gameSession });
    }

    return res.status(200).json({ isCorrect, characterId });
  } catch (error) {
    console.error("Error guessing character coordinates:", error);
    return res
      .status(500)
      .json({ error: "Failed to guess character coordinates" });
  }
}
//based on user guess check if all characters are found and update game status
//  return current game data and if there is next level data
async function gameSessionController(gameId, userGuess, userName) {
  if (!gameId) {
    throw new Error("Game ID is required");
  }
  try {
    if (userGuess) {
      const { game, isGameEnded } = await updateGameStatus(gameId);
      if (isGameEnded || game.status === "COMPLETED") {
        const nextLevelGame = await createNextLevel(game.userId, game.level);
        //update leaderboard if game ended

        const timeTaken = Math.floor(
          (game.finishedAt.getTime() - game.createdAt.getTime()) / 1000,
        );

        const leaderboard = await updateLeaderboard(
          game.level,
          timeTaken,
          userName,
          game.id,
        );

        return {
          userGuess,
          isGameEnded,
          currentGame: game,
          leaderboard,
          nextGame: nextLevelGame,
        };
      }
      return { userGuess, isGameEnded, currentGame: game, nextGame: null };
    }
  } catch (error) {
    console.error("Error in game session controller:", error);
    return { error: "Failed to process game session" };
  }
}
//game status based on game id
async function gameStatusById(req, res) {
  const gameId = req.params.gameId;

  if (!gameId) {
    return res.status(400).json({ error: "Game ID is required" });
  }

  try {
    const game = await getGameById(Number(gameId));
    const isGameEnded = (await game.status) === "COMPLETED";
    const currentGame = { ...game, isGameEnded };

    return res.status(200).json({ isGameEnded, currentGame });
  } catch (error) {
    console.error("Error getting game status:", error);
    return res.status(500).json({ error: "Failed to get game status" });
  }
}
async function createNextLevel(userId, currentLevel) {
  const totalLevels = allGames.games.length;
  const level = (currentLevel % totalLevels) + 1;
  const nextLevel = allGames.games.find((l) => l.level === level);

  try {
    const isGameExist = await getGameByLevel(level, userId);
    if (isGameExist) {
      return isGameExist;
    }
    const newGAme = await createGame(
      userId,
      nextLevel.level,
      nextLevel.image,
      nextLevel.characters,
    );
    return newGAme;
  } catch (error) {
    console.error("Error creating next level game:", error);
    throw error;
  }
}
async function removeGameById(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Game ID is required" });
  }
  try {
    const deletedGame = await deleteGameById(Number(id));
    if (!deletedGame) {
      return res.status(404).json({ error: "Game not found" });
    }
    return res.status(200).json(deletedGame);
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete game" });
  }
}
async function getLeaderboardByLevel(req, res) {
  const level = Number(req.params.level);

  if (!level) {
    return res.status(400).json({ error: "Level is required" });
  }

  try {
    const leaderboard = await getLeaderboard(Number(level));
    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    return res.status(500).json({ error: "Failed to get leaderboard" });
  }
}

export {
  showAllGames,
  startGame,
  guessCharacterCoordinate,
  gameStatusById,
  getLeaderboardByLevel,
  removeGameById,
};
