import { nanoid } from "nanoid";
import React from "react";

import { useGetPokemonInfiniteQuery } from "../../api/hooks";
import { PageLayout, PokemonModal } from "../../components";
import { Loader, Modal } from "../../components/UI";
import { getPokemonId } from "../../utils/helpers";
import { useInView } from "../../utils/hooks";

import styles from "./PokemonsPage.module.css";

export const PokemonsPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useGetPokemonInfiniteQuery();

  const { isInView, ref } = useInView();
  const [selectedPokemonId, setSelectedPokemonId] = React.useState<
    Pokemon["id"] | null
  >(null);

  React.useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage();
    }
  }, [isInView]);

  React.useEffect(() => {
    const overflowOptions = selectedPokemonId !== null ? "hidden" : "unset";

    document.body.setAttribute("style", `overflow-y:${overflowOptions}`);

    return () => {
      document.body.setAttribute("style", `overflow-y:unset`);
    };
  }, [selectedPokemonId]);

  if (isLoading) {
    return <Loader />;
  }

  const pokemons = data?.pages.reduce(
    (pokemons, { data }) => [...pokemons, ...data.results],
    [] as NamedAPIResource[]
  );

  return (
    <PageLayout>
      <div className={styles.pokemonsContainer}>
        {pokemons?.map((pokemon, index) => {
          const pokemonId = index + 1;

          return (
            <div
              className={styles.pokemonContainer}
              key={nanoid()}
              onClick={() => {
                if (pokemonId !== selectedPokemonId) {
                  setSelectedPokemonId(pokemonId);
                }
              }}
              role="button"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
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
                <Modal onCloseModal={() => setSelectedPokemonId(null)}>
                  <PokemonModal
                    onCloseModal={() => setSelectedPokemonId(null)}
                    id={pokemonId}
                  />
                </Modal>
              )}
            </div>
          );
        })}
      </div>
      <div ref={ref} />
    </PageLayout>
  );
};
