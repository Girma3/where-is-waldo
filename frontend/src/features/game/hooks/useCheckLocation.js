import { useMutation } from "@tanstack/react-query";
import { guessCharacterCoordinate } from "../services/gameApi";
export function useCheckLocation() {
  return useMutation({
    mutationFn: async ({ gameId, characterId, x, y }) => {
      return await guessCharacterCoordinate(gameId, characterId, x, y);
    },
  });
}

export default useCheckLocation;
