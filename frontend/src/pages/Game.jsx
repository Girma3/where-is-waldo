import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import GameCanvas from "../features/game/component/GameCanvas.jsx";
import Modal from "../components/Modal.jsx";
import { getDuration } from "../services/dateFormat.js";
import Table from "../features/leaderboard/component/Table.jsx";
import Button from "../components/Button.jsx";
import { playGame } from "../features/game/services/gameApi.js";

function Game() {
  const [characterStatus, setCharacterStatus] = useState([]);
  const [winModal, setWinModal] = useState(false);
  const [windData, setWindData] = useState(null);

  const navigate = useNavigate();

  const { level: levelParam } = useParams();
  const level = Number(levelParam);

  const { data, isLoading } = useQuery({
    queryKey: ["game", level],
    queryFn: () => playGame({ level }),
  });
  useEffect(() => {
    if (data) {
      const charactersWithStatus = data.characters.map((character) => ({
        ...character,
        found: false,
      }));
      setCharacterStatus(charactersWithStatus);
    }
  }, [data]);

  const handleCharacterFound = (characterId) => {
    setCharacterStatus((prev) =>
      prev.map((c) => (c.id == characterId ? { ...c, found: true } : c)),
    );
  };
  const handleNextGame = () => {
    navigate(`/game/${windData.level}`);
    setWindData(null);
    setWinModal(false);
  };
  const handleGameEnd = (data) => {
    refetch();
    setWindData(data);
    setWinModal(true);
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return (
      <>
        <p>No game data available refresh the page again.</p>
        <Button onClick={() => navigate("/")}>Back To Home</Button>
      </>
    );
  }

  const gameId = data?.id;
  const gameStatus = data?.status;
  const characters = characterStatus || data?.characters;

  return (
    <>
      <header className="flex items-center justify-between m-4 p-2  flex-wrap ">
        <h1>
          Game <span className="text-indigo-800 ">Level {level}</span>
        </h1>
        <Link to="/" className="bg-indigo-600 text-white p-1 rounded-sm">
          Home
        </Link>
      </header>{" "}
      <p className="text-green-600 font-light text-center ">
        Status:{gameStatus}
      </p>
      <div className="flex align-center justify-center gap-4 mb-4 flex-wrap">
        {" "}
        {characters.map((character, i) => (
          <div key={i}>
            <img
              src={`/icons/${character.name.toLowerCase()}-icon.png`}
              alt={character.name}
              className="w-6 h-6 inline-block mr-2"
            />
            {character.name} -{" "}
            <span
              className={
                character.found
                  ? "text-green-500 font-bold"
                  : "text-gray-500 italic"
              }
            >
              {character.found ? "Found" : "Not Found"}
            </span>
          </div>
        ))}
      </div>
      <main className="flex flex-col align-center">
        {data && (
          <GameCanvas
            img={data?.image}
            imgAlt={`level-${data.level}-img`}
            characters={characters}
            gameId={gameId}
            onCharacterFound={handleCharacterFound}
            onGameEnd={handleGameEnd}
          />
        )}

        {level && (
          <>
            <p>Leaderboard</p>
            <Table level={level} />
          </>
        )}
      </main>
      {winModal && (
        <Modal isOpen={winModal} onClose={() => setWinModal(false)}>
          <Modal.Content>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2  rounded-sm flex flex-col items-center justify-between gap-2 ">
              <h1>Good Job!</h1>
              <p>
                Finished at{" "}
                {getDuration(windData?.createdAt, windData?.finishedAt)}
              </p>
              <p>next LEvel {windData?.level}</p>
              <button
                className="w-full  text-white p-1 rounded-sm"
                onClick={handleNextGame}
              >
                next Level
              </button>
            </div>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}
export default Game;
