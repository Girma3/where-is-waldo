import prismaGlobal from "./pool.js";

async function getGameData() {
  try {
    const game = await prismaGlobal.game.findUnique({
      where: { id: 1 },
      include: {
        characters: true,
      },
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
export { getGameData };
