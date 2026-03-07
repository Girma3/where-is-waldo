import { formatDuration, intervalToDuration } from "date-fns";

function getDuration(createdAt, finishedAt) {
  const duration = intervalToDuration({
    start: new Date(createdAt),
    end: new Date(finishedAt),
  });

  return formatDuration(duration);
}

export { getDuration };
