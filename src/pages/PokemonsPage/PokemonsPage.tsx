import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import {
  useGetPokemonInfiniteQuery,
  useGetPokemonQuery,
} from '../../api/hooks';
import { getPokemonId, transformStatName } from '../../utils/helpers';

import styles from './PokemonsPage.module.css';

interface PokemonInfoProps {
  id: Pokemon['id'];
}

export const PokemonInfo: React.FC<PokemonInfoProps> = ({ id }) => {
  const { data, isLoading } = useGetPokemonQuery({
    params: { id },
  });

  if (isLoading || !data) {
    return null;
  }

  const { data: pokemon } = data;

  const pokemonStats = pokemon.stats.map((stat, index) => {
    const transformedStatName = transformStatName(stat.stat.name);

    return (
      <li className={styles.pokemonCardStat} key={index}>
        {transformedStatName}: {stat.base_stat}
      </li>
    );
  });

  const pokemonAbilities = pokemon.abilities.map(({ ability }, index) => {
    const transformedAbilityName = transformStatName(ability.name);

    return (
      <li className={styles.pokemonCardStat} key={index}>
        <div>{transformedAbilityName}</div>
      </li>
    );
  });

  const pokemonTypes = pokemon.types.map(({ type }, index) => {
    const transformedTypeName = transformStatName(type.name);

    return (
      <div className={styles.pokemonCardType} key={index}>
        {transformedTypeName}
      </div>
    );
  });

  return (
    <div className={styles.pokemonCard}>
      <img src={pokemon.sprites.front_default ?? ''} alt={pokemon.name} />

      <div className={styles.cardTypes}>{pokemonTypes}</div>

      <div className={styles.info}>
        <div>
          <h3 className={styles.infoTitle}>Stats</h3>
          <ul>{pokemonStats}</ul>
        </div>
        <div>
          <h3 className={styles.infoTitle}>Abilities</h3>
          <ul>{pokemonAbilities}</ul>
        </div>
      </div>
    </div>
  );
};

export const PokemonsPage: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useGetPokemonInfiniteQuery();

  console.log(data);

  const { ref, inView } = useInView();
  const [selectedPokemonId, setSelectedPokemonId] = React.useState<
    Pokemon['id'] | null
  >(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const pokemons = data?.pages.reduce(
    (pokemons, { data }) => [...pokemons, ...data.results],
    [] as NamedAPIResource[]
  );

  return (
    <div className="container mx-auto">
      <div className={styles.pokemonsContainer}>
        {pokemons?.map((pokemon, index) => {
          const pokemonId = index + 1;

          return (
            <div
              className={styles.pokemonContainer}
              key={index}
              onClick={() => {
                if (pokemonId === selectedPokemonId) {
                  navigate(`pokemon/${pokemonId}`);
                } else {
                  setSelectedPokemonId(pokemonId);
                }
              }}
              role="button"
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  if (pokemonId === selectedPokemonId) {
                    navigate(`pokemon/${pokemonId}`);
                  } else {
                    setSelectedPokemonId(pokemonId);
                  }
                }
              }}
              tabIndex={0}
            >
              <div className={styles.pokemon}>
                <div className={styles.pokemonName}>{pokemon.name}</div>
                <div>{getPokemonId(String(index + 1))}</div>
              </div>
              {selectedPokemonId === pokemonId && (
                <div
                  className={styles.pokemonInfo}
                  onClick={() => navigate(`pokemon/${pokemonId}`)}
                  role="button"
                  onKeyPress={(event) =>
                    event.key === 'Enter' && navigate(`pokemon/${pokemonId}`)
                  }
                  tabIndex={0}
                >
                  <PokemonInfo id={pokemonId} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div ref={ref} />
    </div>
  );
};
