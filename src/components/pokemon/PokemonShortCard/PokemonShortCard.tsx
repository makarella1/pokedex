import { nanoid } from "nanoid";

import { useGetPokemonQuery } from "../../../api/hooks";
import { Loader } from "../../UI";
import { PokemonType } from "../PokemonType/PokemonType";

import styles from "./PokemonShortCard.module.css";

interface PokemonShortCardProps {
  name: Pokemon["name"];
}

export const PokemonShortCard = ({ name }: PokemonShortCardProps) => {
  const { data: pokemonData, isLoading } = useGetPokemonQuery({ option: name });

  const isPokemonData = !isLoading && pokemonData;

  if (!isPokemonData) {
    return <Loader />;
  }

  const { data: pokemon } = pokemonData;

  return (
    <div className={styles.shortCard}>
      <img
        className={styles.cardImage}
        src={pokemon.sprites.front_default ?? ""}
        alt="Pokemon"
      />
      <div className={styles.info}>
        <p className={styles.name}>{pokemon.name}</p>
        <div className={styles.types}>
          {pokemon.types.map((type) => (
            <PokemonType type={type.type} key={nanoid()} />
          ))}
        </div>
      </div>
    </div>
  );
};
