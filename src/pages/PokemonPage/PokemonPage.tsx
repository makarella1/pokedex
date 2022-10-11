import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetPokemonQuery, useGetPokemonSpeciesQuery } from "../../api/hooks";
import { PageLayout } from "../../components";
import { PokemonEvolutionChain, PokemonStat } from "../../components/pokemon";
import { Button } from "../../components/UI";
import {
  getLastNumber,
  getPokemonId,
  transformStatName,
} from "../../utils/helpers";

import styles from "./PokemonPage.module.css";

export const PokemonPage: React.FC = () => {
  const { pokemonId } = useParams();
  const navigate = useNavigate();

  const id = +pokemonId!;

  const { data: pokemonQueryData, isLoading: isPokemonQueryLoading } =
    useGetPokemonQuery({
      option: id,
    });

  const { data: pokemonSpeciesData, isLoading: isPokemonSpeciesLoading } =
    useGetPokemonSpeciesQuery(
      { id },
      {
        options: {
          enabled: pokemonQueryData && !isPokemonQueryLoading,
        },
      }
    );

  const isLoading = isPokemonQueryLoading || isPokemonSpeciesLoading;

  const isData = pokemonQueryData && pokemonSpeciesData;

  if (isLoading || !isData) {
    return <div>Loading...</div>;
  }

  const { data: pokemon } = pokemonQueryData;
  const { data: pokemonSpecies } = pokemonSpeciesData;

  const chainId = getLastNumber(pokemonSpecies.evolution_chain.url)!;

  const pokemonStats = pokemon.stats.map((stat) => {
    const transformedStatName = transformStatName(stat.stat.name);

    return `${transformedStatName}: ${stat.base_stat}`;
  });

  const pokemonAbilities = pokemon.abilities.map(({ ability }) =>
    transformStatName(ability.name)
  );

  return (
    <PageLayout>
      {isData && (
        <>
          <div className={styles.nameContainer}>
            <div className={styles.number}>
              {getPokemonId(String(pokemon.id))}
            </div>
            <div>{pokemon.name}</div>
          </div>
          <div className={styles.content}>
            <img
              className={styles.contentImage}
              src={pokemon.sprites.front_default ?? ""}
              alt={pokemon.name}
            />
            <div className={styles.stats}>
              <PokemonStat title="Stats" stats={pokemonStats} />
              <PokemonStat title="Abilities" stats={pokemonAbilities} />
            </div>
          </div>
          <div className={styles.chain}>
            <PokemonEvolutionChain id={chainId} pokemonName={pokemon.name} />
            <div className={styles.buttonContainer}>
              {pokemon.id > 1 && (
                <Button
                  variant="primary"
                  onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)}
                >
                  See Previous Pokemon
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)}
              >
                See Next Pokemon
              </Button>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};
