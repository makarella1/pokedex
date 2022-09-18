import React from 'react';

import styles from './PokemonStat.module.css';

interface PokemonStatProps {
  title: string;
  stats: string[];
}

export const PokemonStat: React.FC<PokemonStatProps> = ({ title, stats }) => {
  const statItems = stats.map((stat, index) => (
    <li className={styles.pokemonCardStat} key={index}>
      {stat}
    </li>
  ));

  return (
    <div>
      <h3 className={styles.infoTitle}>{title}</h3>
      <ul>{statItems}</ul>
    </div>
  );
};
