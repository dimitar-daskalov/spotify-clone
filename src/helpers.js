/* eslint-disable no-plusplus */
export const haveObjectData = (data) => {
  if (data && typeof data === "object") {
    return Object.keys(data).length !== 0;
  }

  return false;
};

export const transformSecondsToMinutes = (seconds) => {
  if (seconds && typeof seconds === "number") {
    return `${(seconds / 60).toFixed(2)} m`;
  }

  return 0;
};

export const shuffleArray = (array) => {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};
