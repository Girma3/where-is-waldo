import { useState, useRef } from "react";
import CharacterMenu from "./CharactersMenu";
import useCheckLocation from "../hooks/useCheckLocation.js";
function GameCanvas({
  img,
  imgAlt,
  characters,
  gameId,
  onCharacterFound,
  onGameEnd,
}) {
  const successSound = useRef(new Audio("/success-sound.mp3"));
  const errorSound = useRef(new Audio("/error-sound.mp3"));
  const [clickCoords, setClickCoords] = useState(null);
  const [pendingCoords, setPendingCoords] = useState(null); // store click until character chosen
  const { mutate: checkLocation } = useCheckLocation();

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setClickCoords({ x: xPercent, y: yPercent });
    setPendingCoords({ x, y }); // raw pixels for backend
  };

  const handleCharacterSelect = (characterId) => {
    if (!pendingCoords) return;

    checkLocation(
      { characterId, x: pendingCoords.x, y: pendingCoords.y, gameId },

      {
        onSuccess: (data) => {
          if (data.isCorrect && data.isGameEnded) {
            successSound.current.play();
            onCharacterFound(data.characterId);
            if (data.nextGame) {
              const windData = {
                createdAt: data.currentGame.createdAt,
                finishedAt: data.currentGame.finishedAt,
                level: data.nextGame.level,
              };
              onGameEnd(windData);
            }
          } else {
            errorSound.current.play();
          }
        },
        onError: (err) => {
          errorSound.current.play();
          console.error(err);
        },
      },
    );

    setClickCoords(null);
    setPendingCoords(null);
  };

  return (
    <div className="relative inline-block cursor-crosshair overflow-hidden">
      <img
        src={img}
        alt={imgAlt}
        className="block max-w-full h-auto"
        onClick={handleImageClick}
      />
      {clickCoords && (
        <div
          className="absolute border-4 border-dashed border-black-500 w-10 h-10 -ml-5 -mt-5 pointer-events-none"
          style={{ top: `${clickCoords.y}%`, left: `${clickCoords.x}%` }}
        />
      )}
      {clickCoords && (
        <CharacterMenu
          characters={characters}
          position={clickCoords}
          onSelect={handleCharacterSelect}
        />
      )}
    </div>
  );
}

export default GameCanvas;
