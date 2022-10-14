import { nanoid } from "nanoid";
import React from "react";

import { useGetEvolutionChain } from "../../../api/hooks";
import { getEvolutionChain } from "../../../utils/helpers";
import { Loader } from "../../UI";

import { PokemonEvolutionChainItem } from "./PokemonEvolutionChainItem/PokemonEvolutionChainItem";

import styles from "./PokemonEvolutionChain.module.css";

interface PokemonEvolutionChainProps {
  id: number;
  pokemonName: Pokemon["name"];
}

export const PokemonEvolutionChain: React.FC<PokemonEvolutionChainProps> = ({
  id,
  pokemonName,
}) => {
  const { data: evolutionChainData, isLoading: isEvolutionChainLoading } =
    useGetEvolutionChain({ id });

  const isEvolutionChainData = evolutionChainData && !isEvolutionChainLoading;

  if (!isEvolutionChainData) {
    return <Loader />;
  }

  const { chain } = evolutionChainData.data;

  const evolutionChain = getEvolutionChain(chain);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Evolution chain</h3>
      <div className={styles.evolutionContainer}>
        {evolutionChain.map((evolutionChainItem) => (
          <PokemonEvolutionChainItem
            name={evolutionChainItem.name}
            key={nanoid()}
            isActive={evolutionChainItem.name === pokemonName}
          />
        ))}
      </div>
    </div>
  );
};
