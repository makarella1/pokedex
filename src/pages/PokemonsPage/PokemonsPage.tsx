import React from 'react';

import { useGetPokemonQueries } from '../../api/hooks';
import { Pokemon } from '../../components';

export const PokemonsPage = () => {
  const [offset, setOffset] = React.useState(20);

  const results = useGetPokemonQueries({ offset });

  const isLoading = results.some((result) => result.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const pokemons = results.map((result: any) => result.data.data);

  return (
    <div className="container mx-auto">
      <button onClick={() => setOffset((prevOffset) => prevOffset + 20)}>
        Load more
      </button>
      <div className="grid grid-cols-4 gap-5">
        {pokemons.map((pokemon) => (
          <Pokemon pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>
  );
};
