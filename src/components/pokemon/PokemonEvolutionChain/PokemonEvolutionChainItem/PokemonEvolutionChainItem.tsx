import { clsx } from "clsx";
import { nanoid } from "nanoid";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useGetPokemonQuery } from "../../../../api/hooks";
import { transformStatName } from "../../../../utils/helpers";
import { PokemonType } from "../../PokemonType/PokemonType";

import styles from "./PokemonEvolutionChainItem.module.css";

interface PokemonEvolutionChainItemProps {
  name: Pokemon["name"];
  isActive?: boolean;
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

  const { types } = pokemon;

  return (
    <div className={styles.evolutionContainer}>
      <button
        className={clsx(styles.evolution, isActive && styles.evolutionActive)}
        onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      >
        <img
          className={styles.pokemonImage}
          src={pokemon.sprites.front_default ?? ""}
          alt={pokemon.name}
        />
      </button>
      <p className={styles.name}>
        {uppercasedName} <span className={styles.pokemonId}>#{pokemon.id}</span>
      </p>
      <div className={styles.pokemonTypes}>
        {types.map((type) => (
          <PokemonType type={type.type} key={nanoid()} />
        ))}
      </div>
    </div>
  );
};
