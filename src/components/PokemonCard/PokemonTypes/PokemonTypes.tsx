import React from 'react';

import { PokemonType } from '../PokemonType/PokemonType';

import styles from './PokemonTypes.module.css';

interface PokemonTypesProps {
  types: PokemonType[];
}

export const PokemonTypes: React.FC<PokemonTypesProps> = ({ types }) => (
  <div className={styles.types}>
    {types.map(({ type }, index) => (
      <PokemonType type={type} key={index} />
    ))}
  </div>
);
