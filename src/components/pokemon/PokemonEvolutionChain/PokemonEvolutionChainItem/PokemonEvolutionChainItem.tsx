import { clsx } from "clsx";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

import { useGetPokemonQuery } from "../../../../api/hooks";
import { transformStatName } from "../../../../utils/helpers";
import { Loader } from "../../../UI";
import { PokemonType } from "../../PokemonType/PokemonType";

import styles from "./PokemonEvolutionChainItem.module.css";

interface PokemonEvolutionChainItemProps {
  name: Pokemon["name"];
  isActive?: boolean;
}

export const PokemonEvolutionChainItem = ({
  name,
  isActive,
}: PokemonEvolutionChainItemProps) => {
  const { data: pokemonData, isLoading: isPokemonDataLoading } =
    useGetPokemonQuery({ option: name });

  const navigate = useNavigate();

  const isPokemonData = pokemonData && !isPokemonDataLoading;

  if (!isPokemonData) {
    return <Loader />;
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
