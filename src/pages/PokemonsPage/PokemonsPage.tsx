import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import { useGetPokemonInfiniteQuery } from '../../api/hooks';
import { PokemonCard } from '../../components';
import { getPokemonId } from '../../utils/helpers';

import styles from './PokemonsPage.module.css';

export const PokemonsPage: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useGetPokemonInfiniteQuery();

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
                if (pokemonId !== selectedPokemonId) {
                  setSelectedPokemonId(pokemonId);
                }
              }}
              role="button"
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  if (pokemonId !== selectedPokemonId) {
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
                <div className={styles.pokemonInfo}>
                  <PokemonCard id={pokemonId} onClose={setSelectedPokemonId} />
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
