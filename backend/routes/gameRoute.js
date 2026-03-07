import express from "express";
import {
  startGame,
  removeGameById,
  guessCharacterCoordinate,
  gameStatusById,
  getLeaderboardByLevel,
  showAllGames,
} from "../controllers/gameController.js";

const gameRouter = express.Router();

gameRouter.get("/game/", showAllGames);
gameRouter.get("/game/:level", startGame);
gameRouter.post(
  "/game/:gameId/character/:characterId",
  guessCharacterCoordinate,
);
gameRouter.get("/game/status/:gameId", gameStatusById);
gameRouter.get("/game/leaderboard/:level", getLeaderboardByLevel);
gameRouter.delete("/game/delete/:id", removeGameById);

export default gameRouter;
