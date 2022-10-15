import { clsx } from "clsx";

import { transformStatName } from "../../../utils/helpers/transformStatName";

import styles from "./PokemonType.module.css";

interface PokemonTypeProps {
  type: PokemonType["type"];
}

export const PokemonType = ({ type }: PokemonTypeProps) => {
  const typeName = transformStatName(type.name);

  return <div className={clsx(styles.type, styles[type.name])}>{typeName}</div>;
};
