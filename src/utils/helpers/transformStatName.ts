export const transformStatName = (statName: string) => {
  const transformedName = statName
    .split('-')
    .flatMap((word: string) =>
      word.replace(word.at(0)!, word.at(0)!.toUpperCase())
    )
    .join(' ');

  return transformedName;
};
