import { clsx } from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useGetPokemonQuery } from "../../../../api/hooks";

import styles from "./PokemonTeamMember.module.css";

interface PokemonTeamMemberProps {
  name: Pokemon["name"];
}

export const PokemonTeamMember: React.FC<PokemonTeamMemberProps> = ({
  name,
}) => {
  const navigate = useNavigate();

  const { data: pokemonData, isLoading } = useGetPokemonQuery({ option: name });

  const isData = pokemonData && !isLoading;

  if (!isData) {
    return null;
  }

  const { data: pokemon } = pokemonData;

  return (
    <button
      className={clsx(styles.pokemon, styles[pokemon.types[0].type.name])}
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
    >
      <img src={pokemon.sprites.front_default ?? ""} alt={pokemon.name} />
    </button>
  );
};
