import { clsx } from 'clsx';
import React from 'react';

import {
  useGetEvolutionChainQuery,
  useGetPokemonInfiniteQuery,
} from '../../api/hooks';
import { getPokemonId, transformStatName } from '../../utils/helpers';

import styles from './PokedexPage.module.css';

export const PokedexPage: React.FC = () => {
  const [offset, setOffset] = React.useState(6);
  const [selectedPokemonId, setSelectedPokemonId] = React.useState(1);
  const results = useGetPokemonInfiniteQuery();

  const isLoading = results.some((result) => result.isLoading);

  const { data } = useGetEvolutionChainQuery({
    id: selectedPokemonId,
    config: { enabled: !isLoading },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const pokemons = results.map((result) => result.data!.data);

  const selectedPokemon = pokemons.find(
    (pokemon) => pokemon.id === selectedPokemonId
  );

  const selectedPokemonStats = selectedPokemon?.stats.map((stat, index) => {
    const transformedStatName = transformStatName(stat.stat.name);

    return (
      <li className={styles.cardStatItem} key={index}>
        {transformedStatName}: {stat.base_stat}
      </li>
    );
  });

  const selectedPokemonAbilities = selectedPokemon?.abilities.map(
    ({ ability }, index) => {
      const transformedAbilityName = transformStatName(ability.name);

      return (
        <li className={styles.cardStatItem} key={index}>
          <div>{transformedAbilityName}</div>
        </li>
      );
    }
  );

  const selectedPokemonTypes = selectedPokemon?.types.map(({ type }, index) => {
    const transformedTypeName = transformStatName(type.name);

    return (
      <div className={styles.cardType} key={index}>
        {transformedTypeName}
      </div>
    );
  });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <div className={styles.cardName}>{selectedPokemon?.name}</div>
            <div className={styles.cardId}>
              {getPokemonId(selectedPokemon?.id)}
            </div>
          </div>
          <div className={styles.cardTypes}>{selectedPokemonTypes}</div>
          <div>
            <img
              src={selectedPokemon?.sprites.front_default ?? ''}
              alt={selectedPokemon?.name}
            />
          </div>
          <div className={styles.cardInfo}>
            <div>
              <h3 className={styles.cardInfoTitle}>Stats</h3>
              <ul>{selectedPokemonStats}</ul>
            </div>
            <div>
              <h3 className={styles.cardInfoTitle}>Abilities</h3>
              <ul>{selectedPokemonAbilities}</ul>
            </div>
          </div>
        </div>
        <ul className={styles.list}>
          {pokemons.map((pokemon) => {
            const isActive = pokemon.id === selectedPokemonId;

            return (
              <li
                className={clsx(
                  styles.pokemonItem,
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
                    className={styles.pokemonImage}
                    src={pokemon.sprites.front_default ?? ''}
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
