export const getEvolutionChain = (
  chainLink: ChainLink,
  chain: { name: Pokemon['name'] }[] = []
): { name: Pokemon['name'] }[] => {
  const newChain = [...chain, { name: chainLink.species.name }];

  if (!chainLink.evolves_to.length) {
    return newChain;
  }

  const result = chainLink.evolves_to.flatMap((evolution) =>
    getEvolutionChain(evolution, newChain)
  );

  return [...new Set(result)];
};
