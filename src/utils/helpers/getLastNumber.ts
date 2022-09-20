export const getLastNumber = (url: string) => {
  const matches = url.match(/\d+/g);

  return Number(matches?.at(matches.length - 1));
};
