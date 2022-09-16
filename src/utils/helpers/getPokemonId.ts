export const getPokemonId = (pokemonId: string) => {
  const formattedId = pokemonId.padStart(3, '0');

  return `#${formattedId}`;
};
