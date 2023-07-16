export const secondsToHours = (seconds) => {
  return Math.floor(seconds / (60 * 60).toFixed(2));
};

export const secondsToMinutes = (seconds) => {
  return Math.floor((seconds / 60) % 60);
};
