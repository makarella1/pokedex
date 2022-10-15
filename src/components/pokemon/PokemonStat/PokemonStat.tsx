import { nanoid } from "nanoid";

import styles from "./PokemonStat.module.css";

interface PokemonStatProps {
  title: string;
  stats: string[];
}

export const PokemonStat = ({ title, stats }: PokemonStatProps) => {
  const statItems = stats.map((stat) => (
    <li className={styles.pokemonCardStat} key={nanoid()}>
      {stat}
    </li>
  ));

  return (
    <div className={styles.statCard}>
      <h3 className={styles.infoTitle}>{title}</h3>
      <ul>{statItems}</ul>
    </div>
  );
};
