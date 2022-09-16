import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetPokemonQuery } from '../../api/hooks';

export const PokemonPage: React.FC = () => {
  const { pokemonId } = useParams();

  const { data } = useGetPokemonQuery({
    params: { id: +pokemonId! },
  });

  return <div className="container mx-auto">{data?.data.name}</div>;
};
