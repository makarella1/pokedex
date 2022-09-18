import React from 'react';
import ReactDOM from 'react-dom';
import { useInView } from 'react-intersection-observer';

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

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  React.useEffect(() => {
    const overflowOptions = selectedPokemonId !== null ? 'hidden' : 'unset';

    document.body.setAttribute('style', `overflow:${overflowOptions}`);
  }, [selectedPokemonId]);

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
              {selectedPokemonId === pokemonId &&
                ReactDOM.createPortal(
                  <PokemonCard id={pokemonId} onClose={setSelectedPokemonId} />,
                  document.querySelector('#modal') as HTMLDivElement
                )}
            </div>
          );
        })}
      </div>
      <div ref={ref} />
    </div>
  );
};
