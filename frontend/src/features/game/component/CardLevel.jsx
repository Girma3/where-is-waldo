import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const hardLevelStyle = `text-red-500  bg-red-100 rounded-sm p-2`;
const easyLevelStyle = `text-green-500  bg-green-100 rounded-sm p-2`;
const mediumLevelStyle = `text-yellow-500  bg-yellow-100  rounded-sm p-2`;

function CardLevel({ levelData: { level, difficulty, image, characters } }) {
  let levelDifficultyStyle = "";
  if (difficulty === "hard") {
    levelDifficultyStyle = hardLevelStyle;
  } else if (difficulty === "easy") {
    levelDifficultyStyle = easyLevelStyle;
  } else if (difficulty === "medium") {
    levelDifficultyStyle = mediumLevelStyle;
  }

  return (
    <Link to={`/game/${level}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        className="flex flex-col items-center justify-center gap-2 w-48 bg-white cursor-pointer"
      >
        <img
          src={`${image}`}
          alt={`Level ${level} image`}
          className="w-full h-32 object-cover rounded-sm"
        />

        <p className="font-semibold">
          Level {level} -{" "}
          <span className={levelDifficultyStyle}>{difficulty}</span>
        </p>

        <p className="text-sm text-gray-600">
          Find these {characters.length > 1 ? "characters" : "character"}
        </p>

        <ul className="flex flex-wrap gap-2 justify-center text-xs text-black">
          {characters.map(({ name, icon }) => (
            <li key={name}>
              <img
                src={icon}
                alt={name}
                className="w-8 h-8 object-contain rounded-full shadow-sm"
              />
            </li>
          ))}
        </ul>
      </motion.div>
    </Link>
  );
}

export default CardLevel;
