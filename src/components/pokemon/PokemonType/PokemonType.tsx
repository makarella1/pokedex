import { clsx } from "clsx";
import React from "react";

import { transformStatName } from "../../../utils/helpers/transformStatName";

import styles from "./PokemonType.module.css";

interface PokemonTypeProps {
  type: PokemonType["type"];
}

export const PokemonType: React.FC<PokemonTypeProps> = ({ type }) => {
  const typeName = transformStatName(type.name);

  return <div className={clsx(styles.type, styles[type.name])}>{typeName}</div>;
};
