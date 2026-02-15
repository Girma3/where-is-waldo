import express from "express";
import {
  startGame,
  removeGameById,
  guessCharacterCoordinate,
  gameStatusById,
  getLeaderboardByLevel,
} from "../controllers/gameController.js";
import isUserAuth from "../authentication/isUserAuth.js";
const gameRouter = express.Router();

gameRouter.get("/game/:level", startGame);
gameRouter.post(
  "/game/:gameId/character/:characterId",
  guessCharacterCoordinate,
);
gameRouter.get("/game/status/:gameId", gameStatusById);
gameRouter.get("/game/leaderboard/:level", getLeaderboardByLevel);
gameRouter.delete("/game/delete/:id", removeGameById);

export default gameRouter;
