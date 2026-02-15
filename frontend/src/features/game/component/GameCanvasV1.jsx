import { useState } from "react";
import CharacterMenu from "./CharactersMenu";
import useCheckLocation from "../hooks/useCheckLocation";
function GameCanvas() {
  const [clickCoords, setClickCoords] = useState(null);
  const checkLocation = useCheckLocation();
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Convert to percentages (CRITICAL for responsiveness)
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    console.log(`Clicked at: ${xPercent.toFixed(2)}%, ${yPercent.toFixed(2)}%`);
    // Save these to display the "Targeting Box"
    setClickCoords({ x: xPercent, y: yPercent, pixelX: x, pixelY: y });
    checkLocation.mutate(
      { characterId, x, y },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };
  const handleCharacterSelect = (character) => {
    //validate character later in backend
    setClickCoords(null);
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
