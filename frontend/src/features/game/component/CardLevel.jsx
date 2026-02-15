import { motion } from "framer-motion";

const LEVEL_DATA = [
  {
    levelNumber: 1,
    difficulty: "Easy",
    characterNames: ["Waldo", "Odlaw", "Whitebeard"],
    characterImages: ["/waldo-icon.png", "/wizard-icon.png", "/odlaw-icon.png"],
  },
];

function CardLevel() {
  const { levelNumber, difficulty, characterImages, characterNames } =
    LEVEL_DATA[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, rotateX: 4 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex flex-col items-center justify-center gap-2 w-48 bg-white cursor-pointer "
    >
      <img
        src="./easy-level.png"
        alt="waldo"
        className="w-full h-32 object-cover rounded-sm"
      />

      <p className="text-center font-bold text-white">
        Level {levelNumber}{" "}
        <span className="text-orange-400 font-semibold">{difficulty}</span>
      </p>

      <p className="text-sm text-white">Find this characters</p>
      <ul className="flex flex-wrap gap-2 justify-center text-xs text-black">
        {characterImages.map((imageUrl, i) => (
          //
          <li key={i}>
            <img
              src={imageUrl}
              alt="character"
              className="w-8 h-8 object-contain rounded-full shadow-sm"
            />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default CardLevel;
