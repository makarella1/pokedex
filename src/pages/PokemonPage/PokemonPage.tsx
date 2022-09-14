import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetPokemonQuery } from '../../api/hooks';

export const PokemonPage: React.FC = () => {
  const { pokemonId } = useParams();

  const { data } = useGetPokemonQuery({ id: +pokemonId! });

  console.log(data);

  return <div className="container">{data?.data.name}</div>;
};
