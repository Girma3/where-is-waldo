const CHARACTERS = [
  { id: "waldo", name: "Waldo", image: "/waldo-icon.png" },
  { id: "odlaw", name: "Odlaw", image: "/odlaw-icon.png" },
  { id: "wizard", name: "Whitebeard", image: "/wizard-icon.png" },
];

const CharacterMenu = ({ position, onSelect }) => {
  return (
    <div
      className="absolute bg-white border border-gray-300 rounded-lg shadow-xl z-50 overflow-hidden w-40"
      style={{
        top: `${position.y}%`,
        left: `${position.x + 2}%`, // Offset slightly so it doesn't cover the click
      }}
    >
      <ul className="flex flex-col">
        {CHARACTERS.map((char) => (
          <li key={char.id}>
            <button
              onClick={() => onSelect(char)}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-3 transition-colors"
            >
              {/* If you have icons, uncomment below */}
              {/* <img src={char.image} className="w-6 h-6 rounded-full" /> */}
              <span className="text-sm font-medium text-gray-700">
                {char.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterMenu;
