export const haveObjectData = (data) => {
  if (data && typeof data === "object") {
    return Object.keys(data).length !== 0;
  }

  return false;
};
