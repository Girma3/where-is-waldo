import prismaGlobal from "./pool.js";

async function createGame(userId, level, image, characters) {
  try {
    const newGame = await prismaGlobal.game.create({
      data: {
        userId,
        image,
        level,
        characters: {
          create: characters.map((character) => ({
            name: character.name,
            correctX: character.correctX,
            correctY: character.correctY,
          })),
        },
      },
      include: { characters: true },
    });
    return newGame;
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
}

async function getGame(userId) {
  try {
    const game = await prismaGlobal.game.findFirst({
      where: {
        userId: userId,
      },
      include: { characters: true },
    });

    return game;
  } catch (err) {
    console.error("Error fetching game data:", err);
    throw err;
  }
}
async function getGameById(gameId) {
  if (!gameId) {
    throw new Error("Game ID is required");
  }
  try {
    const game = await prismaGlobal.game.findUnique({
      where: { id: gameId },
      include: { characters: true },
    });
    return game;
  } catch (error) {
    console.error("Error fetching game data:", error);
    throw error;
  }
}
async function findGameByLevel(level, userId) {
  if (!level || !userId) {
    throw new Error("level and userId are required");
  }
  try {
    return await prismaGlobal.game.findFirst({
      where: { level, userId },
      include: { characters: true },
    });
  } catch (error) {
    console.error("Error finding game by level:", error);
    throw error;
  }
}
async function getGameByLevel(level, userId) {
  if (!level || !userId) {
    throw new Error("Level and User ID are required");
  }
  try {
    const game = await findGameByLevel(level, userId);
    if (!game) return null;

    return resetGameById(game.id);
  } catch (error) {
    console.error("Error fetching game by level:", error);
    throw error;
  }
}

async function resetGameById(gameId) {
  if (!gameId) {
    throw new Error("Game ID is required to reset the game");
  }
  try {
    await prismaGlobal.game.update({
      where: { id: gameId },
      data: { status: "IN_PROGRESS", createdAt: new Date(), finishedAt: null },
    });
    await prismaGlobal.character.updateMany({
      where: { gameId, found: true },
      data: { found: false },
    });
    return getGameById(gameId);
  } catch (error) {
    console.error("Error resetting game:", error);
    throw error;
  }
}
async function getAllGameData(userId) {
  try {
    const game = await prismaGlobal.game.findMany({
      where: {
        userId: userId,
      },
      include: { characters: true },
    });

    if (!game) {
      throw new Error("Game not found");
    }
    return game;
  } catch (error) {
    console.error("Error fetching game data:", error);
    throw error;
  }
}
//user guess checker
async function getCharacterById(characterId) {
  try {
    const character = await prismaGlobal.character.findUnique({
      where: { id: characterId },
    });

    return character;
  } catch (error) {
    console.error("Error fetching character data:", error);
    throw error;
  }
}

async function updateGameStatus(gameId) {
  if (!gameId) {
    throw new Error("Game ID is required to check if all characters are found");
  }
  try {
    const game = await prismaGlobal.game.findUnique({
      where: { id: gameId },
      include: { characters: true },
    });

    if (!game) {
      throw new Error("Game not found");
    }
    const remaining = await prismaGlobal.character.count({
      where: { gameId: gameId, found: false },
    });

    let updatedGame = game;
    if (remaining == 0) {
      updatedGame = await prismaGlobal.game.update({
        where: { id: gameId },
        data: { status: "COMPLETED", finishedAt: new Date() },
        include: { characters: true },
      });
    }

    return { game: updatedGame, isGameEnded: remaining == 0 };
  } catch (error) {
    console.error("Error checking if all characters are found:", error);
    throw error;
  }
}
//update character based on guess
async function updateCharacterFoundStatus(characterId, isFound) {
  if (!characterId) {
    throw new Error("Character ID is required to update found status");
  }
  try {
    const updatedCharacter = await prismaGlobal.character.update({
      where: { id: characterId },
      data: { found: isFound },
    });
    return updatedCharacter;
  } catch (error) {
    console.error("Error updating character found status:", error);
    throw error;
  }
}

async function deleteGameById(id) {
  if (!id) {
    throw new Error("Game ID is required for deletion");
  }
  try {
    const game = await prismaGlobal.game.delete({
      where: { id: id },
    });
    return game;
  } catch (error) {
    console.error("Error deleting game:", error);
    throw error;
  }
}
async function getLeaderboard(level) {
  if (!level) {
    throw new Error("Level is required for leaderboard");
  }

  try {
    const leaderBoard = await prismaGlobal.leaderboardEntry.findMany({
      where: { level: level },
      orderBy: { timeTaken: "asc" },
    });
    return leaderBoard;
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    throw error;
  }
}
//leaderboard only store top 3 for now can be changed if wanted
//  decide if a score qualifies for leaderboard based on current entries and time taken
function qualifiesForLeaderboard(leaderboard, timeTaken) {
  if (leaderboard.length < 3) return true;
  return timeTaken < leaderboard[leaderboard[leaderboard.length - 1].timeTaken];
}

// function to add entry and cleanup extras
async function addLeaderboardEntry(level, timeTaken, userName, gameId) {
  // Use a transaction to ensure atomicity
  await prismaGlobal.$transaction(async (prisma) => {
    // Add the new leaderboard entry
    await prisma.leaderboardEntry.create({
      data: { level, timeTaken, userName, gameId },
    });

    // Find entries exceeding the top 3 (ordered by timeTaken ascending)
    const extras = await prisma.leaderboardEntry.findMany({
      where: { level },
      orderBy: { timeTaken: "asc" },
      skip: 3,
      select: { id: true },
    });

    // Delete extra entries if any
    if (extras.length > 0) {
      const idsToDelete = extras.map((entry) => entry.id);
      await prisma.leaderboardEntry.deleteMany({
        where: { id: { in: idsToDelete } },
      });
    }
  });
}

// function to update leaderboard if qualifies
async function updateLeaderboard(level, timeTaken, userName, gameId) {
  if (!level || !userName || !timeTaken || !gameId) {
    throw new Error("Level, userName, gameId, and timeTaken are required");
  }

  try {
    const leaderboard = await getLeaderboard(level);

    if (qualifiesForLeaderboard(leaderboard, timeTaken)) {
      await addLeaderboardEntry(level, timeTaken, userName, gameId);
    }

    return getLeaderboard(level);
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    throw error;
  }
}

export {
  createGame,
  getGame,
  getAllGameData,
  getCharacterById,
  getGameById,
  getGameByLevel,
  updateCharacterFoundStatus,
  updateGameStatus,
  getLeaderboard,
  deleteGameById,
  updateLeaderboard,
};
