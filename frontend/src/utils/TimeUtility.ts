export function convertEpochMsToDateTime(
  epochMs: number,
  offset_hours: number = 8,
) {
  const date = new Date(epochMs);
  // Singapore Time
  const hours = date.getUTCHours() + offset_hours;
  const minutes = date.getUTCMinutes();
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  return `${day}/${String(month).padStart(2, '0')}/${year} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
