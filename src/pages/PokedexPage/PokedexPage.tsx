import { clsx } from 'clsx';
import React from 'react';

import { useGetPokemonQueries } from '../../api/hooks';

import styles from './Pokedex.module.css';

export const PokedexPage = () => {
  const [offset, setOffset] = React.useState(10);
  const [selectedPokemonId, setSelectedPokemonId] = React.useState(0);
  const results = useGetPokemonQueries({ offset });

  const isLoading = results.some((result) => result.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const pokemons = results.map((result: any) => result.data.data);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <div className={styles.card}>card</div>
        <ul className={styles.list}>
          {pokemons.map((pokemon) => {
            const isActive = pokemon.id === selectedPokemonId;

            return (
              <li
                className={clsx(
                  styles.pokemonItem,
                  'group',
                  isActive && styles.pokemonItemActive
                )}
                key={pokemon.id}
                tabIndex={0}
                aria-selected={isActive}
                role="option"
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    setSelectedPokemonId(pokemon.id);
                  }
                }}
                onClick={() => setSelectedPokemonId(pokemon.id)}
              >
                <div className={styles.pokemonImageContainer}>
                  <img
                    className={`${styles.pokemonImage} group-hover:scale-110`}
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                  />
                </div>
                {pokemon.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
