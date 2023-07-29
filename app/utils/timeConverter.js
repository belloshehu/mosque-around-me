export const secondsToHours = (seconds) => {
  return Math.floor(seconds / (60 * 60).toFixed(2));
};

export const secondsToMinutes = (seconds) => {
  return Math.floor((seconds / 60) % 60);
};

export const isDuePrayer = (prayerAdhaanTime, prayerIqaamaTime) => {
  // checks if prayer time is due
  const [adhaanHours, adhaanMinutes] = prayerAdhaanTime.split(":");
  const [iqaamaHours, iqaamaMinutes] = prayerIqaamaTime.split(":");

  let [currentHours, currentMinutes] = new Date()
    .toLocaleTimeString()
    .split(":");
  // console.log(currentHours, currentMinutes);
  // console.log(adhaanHours, adhaanMinutes);
  // console.log(iqaamaHours, iqaamaMinutes);
  if (adhaanHours == currentHours && currentMinutes >= adhaanMinutes) {
    if (currentMinutes <= iqaamaMinutes) {
      return true;
    }
    return false;
  }
  // for scenario where Iqaama time is 00 o'clock and adhaan time is 23 o'clock
  if (adhaanHours === "23" && iqaamaHours <= adhaanHours) {
    if (
      currentHours == adhaanHours &&
      currentMinutes <= 59 &&
      currentMinutes >= adhaanMinutes
    ) {
      return true;
    } else if (currentHours == "0" && currentMinutes <= iqaamaMinutes) {
      return true;
    }
    return false;
  } else {
    return false;
  }
};
