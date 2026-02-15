import { useMutation } from "@tanstack/react-query";

const DEFAULT_VALIDATE_URL = "/api/game/validate-location";

/**
 * useCheckLocation
 * A React Query mutation hook that validates whether a click location matches a character.

 */

function useCheckLocation(validateUrl = DEFAULT_VALIDATE_URL) {
  const { mutateAsync, isLoading, error } = useMutation(
    async ({ characterId, x, y }) => {
      const response = await fetch(validateUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterId, x, y }),
      });

      if (!response.ok) {
        throw new Error("Failed to validate location");
      }

      return response.json();
    },
  );

  return {
    checkLocation: mutateAsync,
    isLoading,
    error,
  };
}

export default useCheckLocation;
