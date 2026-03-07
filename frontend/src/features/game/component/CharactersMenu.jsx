const CharacterMenu = ({ characters, position, onSelect }) => {
  return (
    <div
      className="absolute bg-white border border-gray-300 rounded-lg shadow-xl z-50 overflow-hidden w-40"
      style={{
        top: `${position.y}%`,
        left: `${position.x + 2}%`, // Offset slightly so it doesn't cover the click
      }}
    >
      <ul className="flex flex-col">
        {characters.map(
          (char) =>
            !char.found && (
              <li key={char.id}>
                <button
                  onClick={() => onSelect(char.id)}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-3 transition-colors"
                >
                  <img
                    src={`/${char.name.toLowerCase()}-icon.png`}
                    alt={char.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {char.name}
                  </span>
                </button>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default CharacterMenu;
