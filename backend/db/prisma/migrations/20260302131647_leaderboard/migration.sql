/*
  Warnings:

  - You are about to drop the `Guess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Guess" DROP CONSTRAINT "Guess_characterId_fkey";

-- DropForeignKey
ALTER TABLE "Guess" DROP CONSTRAINT "Guess_gameId_fkey";

-- DropTable
DROP TABLE "Guess";

-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "timeTaken" INTEGER NOT NULL,
    "achievedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "userName" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "LeaderboardEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaderboardEntry" ADD CONSTRAINT "LeaderboardEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderboardEntry" ADD CONSTRAINT "LeaderboardEntry_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
