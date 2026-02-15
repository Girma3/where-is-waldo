import { useState } from "react";
import CharacterMenu from "./CharactersMenu";
import useCheckLocation from "../hooks/useCheckLocation";

function GameCanvas() {
  const [clickCoords, setClickCoords] = useState(null);
  const [pendingCoords, setPendingCoords] = useState(null); // store click until character chosen
  const checkLocation = useCheckLocation();

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

    checkLocation.mutate(
      { characterId, x: pendingCoords.x, y: pendingCoords.y },
      {
        onSuccess: (data) => {
          console.log(data);
          if (data.found) {
            alert(`You found ${data.character}!`);
          } else {
            alert("Not quite, try again!");
          }
        },
      },
    );

    setClickCoords(null);
    setPendingCoords(null);
  };

  return (
    <div className="relative inline-block cursor-crosshair overflow-hidden">
      <img
        src="/waldo.png"
        alt="waldo"
        className="block max-w-full h-auto"
        onClick={handleImageClick}
      />
      {clickCoords && (
        <div
          className="absolute border-4 border-dashed border-red-500 w-10 h-10 -ml-5 -mt-5 pointer-events-none"
          style={{ top: `${clickCoords.y}%`, left: `${clickCoords.x}%` }}
        />
      )}
      {clickCoords && (
        <CharacterMenu
          position={clickCoords}
          onSelect={handleCharacterSelect}
        />
      )}
    </div>
  );
}

export default GameCanvas;
