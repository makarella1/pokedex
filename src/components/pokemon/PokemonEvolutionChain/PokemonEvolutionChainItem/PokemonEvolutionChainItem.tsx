import { clsx } from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetPokemonQuery } from '../../../../api/hooks';
import { transformStatName } from '../../../../utils/helpers';

import styles from './PokemonEvolutionChainItem.module.css';

interface PokemonEvolutionChainItemProps {
  name: Pokemon['name'];
  isActive: boolean;
}

export const PokemonEvolutionChainItem: React.FC<
  PokemonEvolutionChainItemProps
> = ({ name, isActive }) => {
  const { data: pokemonData, isLoading: isPokemonDataLoading } =
    useGetPokemonQuery({ option: name });

  const navigate = useNavigate();

  const isPokemonData = pokemonData && !isPokemonDataLoading;

  if (!isPokemonData) {
    return <div>Loading...</div>;
  }

  const { data: pokemon } = pokemonData;

  const uppercasedName = transformStatName(name);

  return (
    <button
      className={clsx(styles.evolution, isActive && styles.evolutionActive)}
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
    >
      <img
        className={styles.pokemonImage}
        src={pokemon.sprites.front_default ?? ''}
        alt={pokemon.name}
      />
      <p className={styles.name}>{uppercasedName}</p>
    </button>
  );
};
