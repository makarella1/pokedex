import { nanoid } from "nanoid";

import { PokemonType } from "../PokemonType/PokemonType";

import styles from "./PokemonTypes.module.css";

interface PokemonTypesProps {
  types: PokemonType[];
}

export const PokemonTypes = ({ types }: PokemonTypesProps) => (
  <div className={styles.types}>
    {types.map(({ type }) => (
      <PokemonType type={type} key={nanoid()} />
    ))}
  </div>
);
